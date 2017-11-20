module ReferenceMetaData exposing (ReferenceMetaData, addInstance, empty, numInstances)


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


numInstances : ReferenceMetaData -> Int
numInstances (ReferenceMetaData data) =
    List.length data.instances
