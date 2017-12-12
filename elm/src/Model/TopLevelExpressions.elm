module Model.TopLevelExpressions exposing (collect)

import Dict exposing (Dict)
import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Ranged exposing (Ranged)
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
import Types.Expression exposing (Expression)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , topLevelExpressions : TopLevelExpressions
    }


collect : Model model -> Model model
collect model =
    { model | topLevelExpressions = collectExpressions model.fileAST }


collectExpressions : Result (List String) RawFile -> TopLevelExpressions
collectExpressions parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .declarations
                |> collectExpsFrom

        Err errors ->
            Types.TopLevelExpressions.default


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

                isAnElmProgram =
                    case function.signature of
                        Just ( range, signature ) ->
                            signature.typeAnnotation
                                |> Tuple.second
                                |> firstTypeIsProgram

                        Nothing ->
                            False
            in
            { topLevelExpressions | functions = Dict.insert name (Expression lineNumber isAnElmProgram) topLevelExpressions.functions }

        ( range, Elm.Syntax.Declaration.AliasDecl typeAlias ) ->
            let
                name =
                    typeAlias.name

                lineNumber =
                    range.start.row
            in
            { topLevelExpressions | typeAliases = Dict.insert name (Expression lineNumber False) topLevelExpressions.typeAliases }

        ( range, Elm.Syntax.Declaration.TypeDecl type_ ) ->
            let
                name =
                    type_.name

                lineNumber =
                    range.start.row
            in
            { topLevelExpressions | types = Dict.insert name (Expression lineNumber False) topLevelExpressions.types }

        _ ->
            topLevelExpressions


firstTypeIsProgram : TypeAnnotation -> Bool
firstTypeIsProgram typeAnnotation =
    case typeAnnotation of
        Elm.Syntax.TypeAnnotation.Typed _ name _ ->
            name == "Program"

        _ ->
            False
