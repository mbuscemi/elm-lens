module Types.Exposings exposing (Exposings, decoder, default, encoder)

import Json.Decode as JD exposing (Decoder, field, list, map2, string)
import Json.Decode.Extra exposing (set)
import Json.Encode as JE exposing (Value, list, object, string)
import Set exposing (Set)


type alias Exposings =
    { functions : Set String
    , types : Set String
    }


default : Exposings
default =
    { functions = Set.empty
    , types = Set.empty
    }


encoder : Exposings -> Value
encoder exposings =
    object
        [ ( "functions"
          , JE.list <| List.map JE.string (Set.toList exposings.functions)
          )
        , ( "types"
          , JE.list <| List.map JE.string (Set.toList exposings.types)
          )
        ]


decoder : Decoder Exposings
decoder =
    map2 Exposings
        (field "functions" <| set JD.string)
        (field "types" <| set JD.string)
