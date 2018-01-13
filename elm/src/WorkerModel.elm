module WorkerModel exposing (WorkerModel, default)

import Dict exposing (Dict)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)
import Types.ImportDependencies exposing (ImportDependencies)
import Util.File


type alias WorkerModel =
    { fileName : String
    , fileAst : File
    , asts : Dict String File
    , processedFile : ElmFile
    , processedDependencies : ImportDependencies
    }


default : WorkerModel
default =
    { fileName = ""
    , fileAst = Util.File.default
    , asts = Dict.empty
    , processedFile = ElmFile.default
    , processedDependencies = Types.ImportDependencies.default
    }
