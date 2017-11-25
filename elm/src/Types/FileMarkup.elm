module Types.FileMarkup exposing (ExpressionData, FileMarkup, default)


type alias FileMarkup =
    { fileName : String
    , expressions : List ExpressionData
    }


type alias ExpressionData =
    { name : String
    , lineNumber : Int
    , isExposed : Bool
    , numInternalRefs : Int
    }


default : FileMarkup
default =
    { fileName = "", expressions = [] }
