module Types.Reference exposing (Reference, decoder, default, encoder, listDecoder, listEncoder)

import Json.Decode as JD exposing (Decoder, field, list, map, string)
import Json.Encode as JE exposing (Value, object, string)


type alias Reference =
    { name : String }


default : Reference
default =
    { name = "" }


encoder : Reference -> Value
encoder reference =
    object
        [ ( "name", JE.string reference.name )
        ]


listEncoder : List Reference -> Value
listEncoder references =
    JE.list (List.map encoder references)


decoder : Decoder Reference
decoder =
    map Reference
        (field "name" JD.string)


listDecoder : Decoder (List Reference)
listDecoder =
    list decoder
