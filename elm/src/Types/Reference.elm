module Types.Reference exposing (Reference, decoder, default, encoder, listDecoder, listEncoder, make)

import Elm.Syntax.Range as Range exposing (Range, decode, emptyRange)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)


type alias Reference =
    { name : String
    , range : Range
    }


default : Reference
default =
    { name = "", range = emptyRange }


make : String -> Int -> Int -> Int -> Int -> Reference
make name startLine startColumn endLine endColumn =
    Reference name
        { start = { row = startLine, column = startColumn }
        , end = { row = endLine, column = endColumn }
        }


encoder : Reference -> Value
encoder reference =
    JE.object
        [ ( "name", JE.string reference.name )
        , ( "range", Range.encode reference.range )
        ]


listEncoder : List Reference -> Value
listEncoder references =
    JE.list (List.map encoder references)


decoder : Decoder Reference
decoder =
    JD.map2 Reference
        (JD.field "name" JD.string)
        (JD.field "range" Range.decode)


listDecoder : Decoder (List Reference)
listDecoder =
    JD.list decoder
