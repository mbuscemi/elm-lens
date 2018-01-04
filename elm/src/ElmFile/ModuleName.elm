module ElmFile.ModuleName exposing (fromFile)

import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Module


fromFile : File -> ModuleName
fromFile file =
    file
        |> .moduleDefinition
        |> Elm.Syntax.Module.moduleName
        |> Maybe.withDefault []
