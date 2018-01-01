module Types.Reference exposing (Reference, decoder, default, encoder, listDecoder, listEncoder, make)

import Elm.Syntax.Range as Range exposing (Range, decode, emptyRange)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)


type alias Reference =
    { name : String
    , range : Range
    , sourceFilePath : String
    }


default : Reference
default =
    { name = ""
    , range = emptyRange
    , sourceFilePath = ""
    }


make : String -> Int -> Int -> Int -> Int -> String -> Reference
make name startLine startColumn endLine endColumn source =
    Reference name
        { start = { row = startLine, column = startColumn }
        , end = { row = endLine, column = endColumn }
        }
        source


encoder : Reference -> Value
encoder reference =
    JE.object
        [ ( "name", JE.string reference.name )
        , ( "range", Range.encode reference.range )
        , ( "sourceFilePath", JE.string reference.sourceFilePath )
        ]


listEncoder : List Reference -> Value
listEncoder references =
    JE.list (List.map encoder references)


decoder : Decoder Reference
decoder =
    JD.map3 Reference
        (JD.field "name" JD.string)
        (JD.field "range" Range.decode)
        (JD.field "sourceFilePath" JD.string)


listDecoder : Decoder (List Reference)
listDecoder =
    JD.list decoder
