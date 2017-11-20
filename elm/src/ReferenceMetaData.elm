module ReferenceMetaData exposing (ReferenceMetaData, addInstance, empty)


type alias Instance =
    { lineNumber : Int
    , line : String
    }


type alias Data =
    { instances : List Instance }


type ReferenceMetaData
    = ReferenceMetaData Data


empty : ReferenceMetaData
empty =
    ReferenceMetaData { instances = [] }


addInstance : Int -> String -> ReferenceMetaData -> ReferenceMetaData
addInstance lineNumber line (ReferenceMetaData data) =
    ReferenceMetaData { data | instances = Instance lineNumber line :: data.instances }
