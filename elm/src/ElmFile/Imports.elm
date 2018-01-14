module ElmFile.Imports exposing (fromFile)

import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.Exposing exposing (Exposing, TopLevelExpose)
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Module exposing (Import)
import Elm.Syntax.Ranged exposing (Ranged)
import Types.Imports exposing (Imports)


fromFile : File -> Imports
fromFile file =
    file
        |> .imports
        |> collectFrom


collectFrom : List Import -> Imports
collectFrom importList =
    List.foldl collectFromAll Types.Imports.default importList


collectFromAll : Import -> Imports -> Imports
collectFromAll import_ imports =
    collectFromAliases import_ imports
        |> collectFromExposings import_


collectFromAliases : Import -> Imports -> Imports
collectFromAliases import_ imports =
    case import_.moduleAlias of
        Just moduleAlias ->
            Types.Imports.addAlias moduleAlias import_.moduleName imports

        Nothing ->
            imports


collectFromExposings : Import -> Imports -> Imports
collectFromExposings import_ imports =
    case import_.exposingList of
        Just exposing_ ->
            collectFromExposing import_.moduleName exposing_ imports

        Nothing ->
            imports


collectFromExposing : ModuleName -> Exposing (Ranged TopLevelExpose) -> Imports -> Imports
collectFromExposing moduleName exposing_ imports =
    case exposing_ of
        Elm.Syntax.Exposing.All _ ->
            Types.Imports.addUnqualified moduleName imports

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

        Elm.Syntax.Exposing.InfixExpose name ->
            Types.Imports.addDirect name moduleName imports
