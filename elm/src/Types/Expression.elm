module Types.Expression exposing (Expression, decoder, encoder, updateLineNumber)

import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)


type alias Expression =
    { lineNumber : Int
    , isOfTypeProgram : Bool
    }


updateLineNumber : Int -> Expression -> Expression
updateLineNumber lineNumber expression =
    { expression | lineNumber = lineNumber }


decoder : Decoder Expression
decoder =
    JD.map2 Expression
        (JD.field "lineNumber" JD.int)
        (JD.field "isOfTypeProgram" JD.bool)


encoder : Expression -> Value
encoder expression =
    JE.object
        [ ( "lineNumber", JE.int expression.lineNumber )
        , ( "isOfTypeProgram", JE.bool expression.isOfTypeProgram )
        ]
