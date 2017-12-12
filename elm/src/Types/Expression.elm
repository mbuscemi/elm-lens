module Types.Expression exposing (Expression, decoder, elmEntrypointExpression, elmTestExpression, encoder, specialTypeToString, standardExpression, updateLineNumber)

import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)


type SpecialType
    = None
    | ElmProgram
    | ElmTest


type alias Expression =
    { lineNumber : Int
    , specialType : SpecialType
    }


standardExpression : Int -> Expression
standardExpression lineNumber =
    Expression lineNumber None


elmEntrypointExpression : Int -> Expression
elmEntrypointExpression lineNumber =
    Expression lineNumber ElmProgram


elmTestExpression : Int -> Expression
elmTestExpression lineNumber =
    Expression lineNumber ElmTest


updateLineNumber : Int -> Expression -> Expression
updateLineNumber lineNumber expression =
    { expression | lineNumber = lineNumber }


decoder : Decoder Expression
decoder =
    JD.map2 Expression
        (JD.field "lineNumber" JD.int)
        (JD.field "specialType" specialTypeDecoder)


encoder : Expression -> Value
encoder expression =
    JE.object
        [ ( "lineNumber", JE.int expression.lineNumber )
        , ( "specialType", specialTypeEncoder expression.specialType )
        ]


specialTypeDecoder : Decoder SpecialType
specialTypeDecoder =
    JD.string |> JD.andThen specialTypeFromString


specialTypeEncoder : SpecialType -> Value
specialTypeEncoder specialType =
    case specialType of
        None ->
            JE.string "None"

        ElmProgram ->
            JE.string "ElmProgram"

        ElmTest ->
            JE.string "ElmTest"


specialTypeFromString : String -> Decoder SpecialType
specialTypeFromString string =
    case string of
        "ElmProgram" ->
            JD.succeed ElmProgram

        "ElmTest" ->
            JD.succeed ElmTest

        _ ->
            JD.succeed None


specialTypeToString : SpecialType -> String
specialTypeToString specialType =
    case specialType of
        None ->
            "None"

        ElmProgram ->
            "ElmProgram"

        ElmTest ->
            "ElmTest"
