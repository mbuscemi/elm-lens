module ElmFile.TopLevelExpressions exposing (fromFile)

import Dict exposing (Dict)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Expression exposing (Function)
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Ranged exposing (Ranged)
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
import Types.Expression exposing (Expression)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


fromFile : File -> TopLevelExpressions
fromFile file =
    file
        |> .declarations
        |> collectExpsFrom


collectExpsFrom : List (Ranged Declaration) -> TopLevelExpressions
collectExpsFrom declarations =
    List.foldl collectExpsFromDeclaration Types.TopLevelExpressions.default declarations


collectExpsFromDeclaration : Ranged Declaration -> TopLevelExpressions -> TopLevelExpressions
collectExpsFromDeclaration declaration topLevelExpressions =
    case declaration of
        ( range, Elm.Syntax.Declaration.FuncDecl function ) ->
            let
                name =
                    function.declaration.name.value

                lineNumber =
                    case function.signature of
                        Just ( range, signature ) ->
                            range.start.row

                        Nothing ->
                            function.declaration.name.range.start.row

                expressionBase =
                    if isA "Program" function then
                        Types.Expression.elmEntrypointExpression
                    else if isA "Test" function then
                        Types.Expression.elmTestExpression
                    else
                        Types.Expression.standardExpression
            in
            { topLevelExpressions | functions = Dict.insert name (expressionBase lineNumber) topLevelExpressions.functions }

        ( range, Elm.Syntax.Declaration.AliasDecl typeAlias ) ->
            let
                name =
                    typeAlias.name

                lineNumber =
                    range.start.row
            in
            { topLevelExpressions | typeAliases = Dict.insert name (Types.Expression.standardExpression lineNumber) topLevelExpressions.typeAliases }

        ( range, Elm.Syntax.Declaration.TypeDecl type_ ) ->
            let
                name =
                    type_.name

                lineNumber =
                    range.start.row
            in
            { topLevelExpressions | types = Dict.insert name (Types.Expression.standardExpression lineNumber) topLevelExpressions.types }

        ( range, Elm.Syntax.Declaration.PortDeclaration functionSignature ) ->
            topLevelExpressions

        ( range, Elm.Syntax.Declaration.InfixDeclaration infix_ ) ->
            topLevelExpressions

        ( range, Elm.Syntax.Declaration.Destructuring rangedPattern rangedExpression ) ->
            topLevelExpressions


isA : String -> Function -> Bool
isA typeName function =
    case function.signature of
        Just ( range, signature ) ->
            signature.typeAnnotation
                |> Tuple.second
                |> firstTypeIs typeName

        Nothing ->
            False


firstTypeIs : String -> TypeAnnotation -> Bool
firstTypeIs typeName typeAnnotation =
    case typeAnnotation of
        Elm.Syntax.TypeAnnotation.Typed _ name _ ->
            name == typeName

        _ ->
            False
