module Model.FileProcessing exposing (addDependencies, firstPass, processDependencies, processReferences, setAst, setFileName)

import Dict exposing (Dict)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)


type alias Model model =
    { model
        | fileName : String
        , fileAst : File
        , asts : Dict String File
        , processedFile : ElmFile
        , processedDependencies : Dict String ElmFile
    }


setFileName : String -> Model model -> Model model
setFileName fileName model =
    { model | fileName = fileName }


setAst : File -> Model model -> Model model
setAst file model =
    { model | fileAst = file }


firstPass : Model model -> Model model
firstPass model =
    { model
        | processedFile =
            ElmFile.createBase model.fileName model.fileAst
                |> ElmFile.parseCore model.fileName model.fileAst
    }


addDependencies : List ( String, String ) -> Model model -> Model model
addDependencies fileData model =
    { model | asts = List.foldl addDependency model.asts fileData }


addDependency : ( String, String ) -> Dict String File -> Dict String File
addDependency ( fileName, fileText ) dict =
    Dict.insert fileName (ElmFile.makeAst fileName fileText) dict


processDependencies : Model model -> Model model
processDependencies model =
    { model | processedDependencies = Dict.map ElmFile.createBase model.asts }


processReferences : Model model -> Model model
processReferences model =
    { model | processedFile = ElmFile.parseReferences model.fileName model.fileAst model.processedFile }
