module Types.SpecialType exposing (SpecialType, decoder, elmProgram, elmTest, encoder, none, toString)

import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)


type SpecialType
    = None
    | ElmProgram
    | ElmTest


none : SpecialType
none =
    None


elmProgram : SpecialType
elmProgram =
    ElmProgram


elmTest : SpecialType
elmTest =
    ElmTest


decoder : Decoder SpecialType
decoder =
    JD.string |> JD.andThen fromString


encoder : SpecialType -> Value
encoder specialType =
    case specialType of
        None ->
            JE.string "None"

        ElmProgram ->
            JE.string "ElmProgram"

        ElmTest ->
            JE.string "ElmTest"


fromString : String -> Decoder SpecialType
fromString string =
    case string of
        "ElmProgram" ->
            JD.succeed ElmProgram

        "ElmTest" ->
            JD.succeed ElmTest

        _ ->
            JD.succeed None


toString : SpecialType -> String
toString specialType =
    case specialType of
        None ->
            "None"

        ElmProgram ->
            "ElmProgram"

        ElmTest ->
            "ElmTest"
