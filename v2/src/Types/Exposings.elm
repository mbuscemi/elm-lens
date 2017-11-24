module Types.Exposings exposing (Exposings, decoder, default, encoder)

import Json.Decode as JD exposing (Decoder, field, list, map2, string)
import Json.Encode as JE exposing (Value, list, object, string)


type alias Exposings =
    { functions : List String
    , types : List String
    }


default : Exposings
default =
    { functions = []
    , types = []
    }


encoder : Exposings -> Value
encoder exposings =
    object
        [ ( "functions"
          , JE.list <| List.map JE.string exposings.functions
          )
        , ( "types"
          , JE.list <| List.map JE.string exposings.types
          )
        ]


decoder : Decoder Exposings
decoder =
    map2 Exposings
        (field "functions" <| JD.list JD.string)
        (field "types" <| JD.list JD.string)
