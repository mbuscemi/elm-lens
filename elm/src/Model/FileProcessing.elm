module Model.FileProcessing exposing (firstPass, processReferences, setAst, setFileName)

import Dict exposing (Dict)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)


type alias Model model =
    { model
        | fileName : String
        , fileAst : File
        , asts : Dict String File
        , processedFile : ElmFile
    }


setFileName : String -> Model model -> Model model
setFileName fileName model =
    { model | fileName = fileName }


setAst : File -> Model model -> Model model
setAst file model =
    { model | fileAst = file }


firstPass : Model model -> Model model
firstPass model =
    { model | processedFile = ElmFile.createBase model.fileName model.fileAst }


processReferences : Model model -> Model model
processReferences model =
    { model | processedFile = ElmFile.parseReferences model.fileName model.fileAst model.processedFile }
