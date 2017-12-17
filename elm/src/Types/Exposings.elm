module Types.Exposings exposing (Exposings, decoder, default, encoder)

import Json.Decode as JD exposing (Decoder)
import Json.Decode.Extra as JD
import Json.Encode as JE exposing (Value)
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
    JE.object
        [ ( "functions", JE.list <| List.map JE.string <| Set.toList exposings.functions )
        , ( "types", JE.list <| List.map JE.string <| Set.toList exposings.types )
        ]


decoder : Decoder Exposings
decoder =
    JD.map2 Exposings
        (JD.field "functions" <| JD.set JD.string)
        (JD.field "types" <| JD.set JD.string)
