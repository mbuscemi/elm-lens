module Types.FileMarkup exposing (ExpressionData, FileMarkup)


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
    , specialType : String
    }
