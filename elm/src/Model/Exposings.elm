module Model.Exposings exposing (collect)

import Dict
import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Exposing exposing (Exposing, TopLevelExpose)
import Elm.Syntax.Module exposing (Module(EffectModule, NormalModule, PortModule))
import Set exposing (Set)
import Types.Exposings exposing (Exposings)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , exposings : Exposings
        , topLevelExpressions : TopLevelExpressions
    }


collect : Model model -> Model model
collect model =
    { model | exposings = collectExposings model.topLevelExpressions model.fileAST }


collectExposings : TopLevelExpressions -> Result (List String) RawFile -> Exposings
collectExposings topLevelExpressions parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .moduleDefinition
                |> exposingListFromModule
                |> gatherExposings topLevelExpressions

        Err errors ->
            Types.Exposings.default


exposingListFromModule : Module -> Exposing TopLevelExpose
exposingListFromModule module_ =
    case module_ of
        NormalModule data ->
            data.exposingList

        PortModule data ->
            data.exposingList

        EffectModule data ->
            data.exposingList


gatherExposings : TopLevelExpressions -> Exposing TopLevelExpose -> Exposings
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


processExposing : TopLevelExpose -> Exposings -> Exposings
processExposing topLevelExpose exposings =
    case topLevelExpose of
        Elm.Syntax.Exposing.InfixExpose name range ->
            exposings

        Elm.Syntax.Exposing.FunctionExpose name range ->
            { exposings | functions = Set.insert name exposings.functions }

        Elm.Syntax.Exposing.TypeOrAliasExpose name range ->
            { exposings | types = Set.insert name exposings.types }

        Elm.Syntax.Exposing.TypeExpose exposedType ->
            exposings
