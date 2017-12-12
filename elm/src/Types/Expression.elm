module Types.Expression exposing (Expression, decoder, elmEntrypointExpression, elmTestExpression, encoder, standardExpression, updateLineNumber)

import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.SpecialType exposing (SpecialType)


type alias Expression =
    { lineNumber : Int
    , specialType : SpecialType
    }


standardExpression : Int -> Expression
standardExpression lineNumber =
    Expression lineNumber Types.SpecialType.none


elmEntrypointExpression : Int -> Expression
elmEntrypointExpression lineNumber =
    Expression lineNumber Types.SpecialType.elmProgram


elmTestExpression : Int -> Expression
elmTestExpression lineNumber =
    Expression lineNumber Types.SpecialType.elmTest


updateLineNumber : Int -> Expression -> Expression
updateLineNumber lineNumber expression =
    { expression | lineNumber = lineNumber }


decoder : Decoder Expression
decoder =
    JD.map2 Expression
        (JD.field "lineNumber" JD.int)
        (JD.field "specialType" Types.SpecialType.decoder)


encoder : Expression -> Value
encoder expression =
    JE.object
        [ ( "lineNumber", JE.int expression.lineNumber )
        , ( "specialType", Types.SpecialType.encoder expression.specialType )
        ]
