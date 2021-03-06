module ElmFile.Exposings exposing (fromFile)

import Dict
import Elm.Syntax.Exposing exposing (Exposing, TopLevelExpose)
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Module
import Elm.Syntax.Ranged exposing (Ranged)
import Set exposing (Set)
import Types.Exposings exposing (Exposings)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


fromFile : TopLevelExpressions -> File -> Exposings
fromFile topLevelExpressions file =
    file
        |> .moduleDefinition
        |> Elm.Syntax.Module.exposingList
        |> gatherExposings topLevelExpressions


gatherExposings : TopLevelExpressions -> Exposing (Ranged TopLevelExpose) -> Exposings
gatherExposings topLevelExpressions topLevelExposeExposing =
    case topLevelExposeExposing of
        Elm.Syntax.Exposing.All range ->
            useAllTopLevelExpressions topLevelExpressions

        Elm.Syntax.Exposing.Explicit exposingsList ->
            List.foldl processExposing Types.Exposings.default exposingsList


useAllTopLevelExpressions : TopLevelExpressions -> Exposings
useAllTopLevelExpressions topLevelExpressions =
    { functions =
        topLevelExpressions.functions
            |> Dict.keys
            |> Set.fromList
    , types =
        Dict.union topLevelExpressions.types topLevelExpressions.typeAliases
            |> Dict.keys
            |> Set.fromList
    }


processExposing : Ranged TopLevelExpose -> Exposings -> Exposings
processExposing topLevelExpose exposings =
    case topLevelExpose of
        ( range, Elm.Syntax.Exposing.FunctionExpose name ) ->
            { exposings | functions = Set.insert name exposings.functions }

        ( range, Elm.Syntax.Exposing.InfixExpose name ) ->
            { exposings | functions = Set.insert name exposings.functions }

        ( range, Elm.Syntax.Exposing.TypeOrAliasExpose name ) ->
            { exposings | types = Set.insert name exposings.types }

        ( range, Elm.Syntax.Exposing.TypeExpose exposedType ) ->
            { exposings | types = Set.insert exposedType.name exposings.types }
