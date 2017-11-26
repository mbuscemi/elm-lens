module Model.TopLevelExpressions exposing (collect)

import Dict exposing (Dict)
import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Types.Expression exposing (Expression)
import Types.TopLevelExpressions exposing (TopLevelExpressions, Updater)


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

        Err stringList ->
            Types.TopLevelExpressions.default


collectExpsFrom : List Declaration -> TopLevelExpressions
collectExpsFrom declarations =
    List.foldl collectExpsFromDeclaration Types.TopLevelExpressions.default declarations


collectExpsFromDeclaration : Declaration -> TopLevelExpressions -> TopLevelExpressions
collectExpsFromDeclaration declaration topLevelExpressions =
    case declaration of
        Elm.Syntax.Declaration.FuncDecl function ->
            let
                name =
                    function.declaration.name.value

                lineNumber =
                    case function.signature of
                        Just signature ->
                            signature.range.start.row

                        Nothing ->
                            function.declaration.name.range.start.row
            in
            { topLevelExpressions | functions = Dict.insert name (Expression lineNumber) topLevelExpressions.functions }

        Elm.Syntax.Declaration.AliasDecl typeAlias ->
            let
                name =
                    typeAlias.name

                lineNumber =
                    typeAlias.range.start.row
            in
            { topLevelExpressions | typeAliases = Dict.insert name (Expression lineNumber) topLevelExpressions.typeAliases }

        Elm.Syntax.Declaration.TypeDecl type_ ->
            let
                name =
                    type_.name

                lineNumber =
                    type_.constructors
                        |> List.head
                        |> Maybe.map (.range >> .start >> .row)
                        |> Maybe.withDefault 0
                        |> flip (-) 1
            in
            { topLevelExpressions | types = Dict.insert name (Expression lineNumber) topLevelExpressions.types }

        _ ->
            topLevelExpressions
