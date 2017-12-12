module Model.Imports exposing (collect)

import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.Exposing exposing (Exposing, TopLevelExpose)
import Elm.Syntax.Module exposing (Import)
import Elm.Syntax.Ranged exposing (Ranged)
import Types.Imports exposing (Imports)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , imports : Imports
    }


collect : Model model -> Model model
collect model =
    { model | imports = collectImports model.fileAST }


collectImports : Result (List String) RawFile -> Imports
collectImports parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .imports
                |> collectFrom

        Err errors ->
            Types.Imports.default


collectFrom : List Import -> Imports
collectFrom importList =
    List.foldl collectFromDeclaration Types.Imports.default importList


collectFromDeclaration : Import -> Imports -> Imports
collectFromDeclaration import_ imports =
    case import_.exposingList of
        Just exposing_ ->
            collectFromExposing import_.moduleName exposing_ imports

        Nothing ->
            imports


collectFromExposing : ModuleName -> Exposing (Ranged TopLevelExpose) -> Imports -> Imports
collectFromExposing moduleName exposing_ imports =
    case exposing_ of
        Elm.Syntax.Exposing.All _ ->
            imports

        Elm.Syntax.Exposing.Explicit rangedExposeList ->
            List.foldl (fromExposing moduleName) imports rangedExposeList


fromExposing : ModuleName -> Ranged TopLevelExpose -> Imports -> Imports
fromExposing moduleName ( range, topLevelExpose ) imports =
    case topLevelExpose of
        Elm.Syntax.Exposing.FunctionExpose name ->
            Types.Imports.addDirect name moduleName imports

        Elm.Syntax.Exposing.TypeOrAliasExpose name ->
            Types.Imports.addDirect name moduleName imports

        Elm.Syntax.Exposing.TypeExpose exposedType ->
            Types.Imports.addDirect exposedType.name moduleName imports

        _ ->
            imports
