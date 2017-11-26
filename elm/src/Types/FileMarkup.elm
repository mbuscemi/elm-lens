module Types.FileMarkup exposing (ExpressionData, FileMarkup, default)


type alias FileMarkup =
    { fileName : String
    , projectIsProcessed : Bool
    , fileIsReprocessing : Bool
    , expressions : List ExpressionData
    }


type alias ExpressionData =
    { name : String
    , lineNumber : Int
    , isExposed : Bool
    , numInternalRefs : Int
    , numExternalRefs : Int
    }


default : FileMarkup
default =
    { fileName = ""
    , projectIsProcessed = False
    , fileIsReprocessing = False
    , expressions = []
    }
