module FunctionMetaData exposing (FunctionMetaData, default, getLineNumber, setLineNumber)


type alias Data =
    { lineNumber : Int }


type FunctionMetaData
    = FunctionMetaData Data


default : FunctionMetaData
default =
    FunctionMetaData { lineNumber = 0 }


setLineNumber : Int -> FunctionMetaData -> FunctionMetaData
setLineNumber lineNumber (FunctionMetaData data) =
    FunctionMetaData { data | lineNumber = lineNumber }


getLineNumber : FunctionMetaData -> Int
getLineNumber (FunctionMetaData data) =
    data.lineNumber
