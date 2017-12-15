module ElmFile.ModuleName exposing (fromFile)

import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Module exposing (Module)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , moduleName : ModuleName
    }


fromFile : File -> ModuleName
fromFile file =
    file
        |> .moduleDefinition
        |> toModuleName


toModuleName : Module -> ModuleName
toModuleName module_ =
    case module_ of
        Elm.Syntax.Module.NormalModule data ->
            data.moduleName

        Elm.Syntax.Module.PortModule data ->
            data.moduleName

        Elm.Syntax.Module.EffectModule data ->
            data.moduleName
