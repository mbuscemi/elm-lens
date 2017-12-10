module Model.Imports exposing (collect)

import Dict exposing (Dict)
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
        , moduleName : ModuleName
        , imports : Imports
    }


collect : Model model -> Model model
collect model =
    { model | imports = collectImports model.moduleName model.fileAST }


collectImports : ModuleName -> Result (List String) RawFile -> Imports
collectImports moduleName parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .imports
                |> collectFrom moduleName

        Err errors ->
            Types.Imports.default


collectFrom : ModuleName -> List Import -> Imports
collectFrom moduleName importList =
    List.foldl (collectFromDeclaration moduleName) Dict.empty importList


collectFromDeclaration : ModuleName -> Import -> Imports -> Imports
collectFromDeclaration moduleName import_ imports =
    case import_.exposingList of
        Just exposing_ ->
            collectFromExposing moduleName exposing_ imports

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
            Types.Imports.addEntry ( name, moduleName ) imports

        Elm.Syntax.Exposing.TypeOrAliasExpose name ->
            Types.Imports.addEntry ( name, moduleName ) imports

        Elm.Syntax.Exposing.TypeExpose exposedType ->
            Types.Imports.addEntry ( exposedType.name, moduleName ) imports

        _ ->
            imports
