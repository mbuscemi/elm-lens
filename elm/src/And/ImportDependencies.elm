module And.ImportDependencies exposing (process)

import And
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)
import Set


type alias Model model =
    { model
        | fileAst : File
        , processedFile : ElmFile
    }


process : message -> Model model -> ( Model model, Cmd message )
process finalizeHandler model =
    let
        unqualifiedImports =
            model.processedFile.imports.unqualified
    in
    if Set.size unqualifiedImports > 0 then
        And.executeNext finalizeHandler model
    else
        And.executeNext finalizeHandler model
