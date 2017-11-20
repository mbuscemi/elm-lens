module Report exposing (FunctionData, Report)


type alias Report =
    { fileName : String
    , functions : List FunctionData
    }


type alias FunctionData =
    { name : String
    , lineNumber : Int
    , isExposed : Bool
    }
