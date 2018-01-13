port module And.ImportDependencies exposing (process)

import And
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)
import Set exposing (Set)


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
        unqualifiedImportPaths model.processedFile.projectPath unqualifiedImports
            |> requestForFiles
            |> And.execute model
    else
        And.executeNext finalizeHandler model


unqualifiedImportPaths : String -> Set ModuleName -> List String
unqualifiedImportPaths projectPath moduleNames =
    Set.toList moduleNames
        |> List.map (pathFromModuleName projectPath)


pathFromModuleName : String -> ModuleName -> String
pathFromModuleName projectPath moduleName =
    projectPath ++ "/" ++ String.join "/" moduleName ++ ".elm"


port requestForFiles : List String -> Cmd message
