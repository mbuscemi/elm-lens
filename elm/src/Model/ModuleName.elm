module Model.ModuleName exposing (record)

import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.Module exposing (Module)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , moduleName : ModuleName
    }


record : Model model -> Model model
record model =
    { model | moduleName = recordModuleName model.fileAST }


recordModuleName : Result (List String) RawFile -> ModuleName
recordModuleName parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .moduleDefinition
                |> toModuleName

        Err errors ->
            []


toModuleName : Module -> ModuleName
toModuleName module_ =
    case module_ of
        Elm.Syntax.Module.NormalModule data ->
            data.moduleName

        Elm.Syntax.Module.PortModule data ->
            data.moduleName

        Elm.Syntax.Module.EffectModule data ->
            data.moduleName
