module Types.FileData exposing (FileData, decoder, empty)

import Dict
import Json.Decode exposing (Decoder, field, list, map4, string)
import Set
import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias FileData =
    { moduleName : List String
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : List Reference
    }


empty : FileData
empty =
    { moduleName = []
    , topLevelExpressions =
        { functions = Dict.empty
        , types = Dict.empty
        , typeAliases = Dict.empty
        }
    , exposings =
        { functions = Set.empty
        , types = Set.empty
        }
    , references = []
    }


decoder : Decoder FileData
decoder =
    map4 FileData
        (field "moduleName" (list string))
        (field "topLevelExpressions" Types.TopLevelExpressions.decoder)
        (field "exposings" Types.Exposings.decoder)
        (field "references" Types.Reference.listDecoder)
