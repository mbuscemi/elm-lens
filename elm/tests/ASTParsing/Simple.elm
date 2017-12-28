module ASTParsing.Simple exposing (canParseSimple)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseSimple : Test
canParseSimple =
    describe "Simple Elm File" <|
        let
            elmFile =
                ElmFile.fromString "Simple.elm" simpleDotElm
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Simple" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct =
                        Dict.empty
                            |> Dict.insert "==" [ "Basics" ]
                            |> Dict.insert "toString" [ "Basics" ]
                            |> Dict.insert "Dict" [ "Dict" ]
                            |> Dict.insert "empty" [ "Dict" ]
                            |> Dict.insert "Set" [ "Set" ]
                            |> Dict.insert "insert" [ "Set" ]
                            |> Dict.insert "Decoder" [ "Json", "Decode" ]
                            |> Dict.insert "Value" [ "Json", "Encode" ]
                            |> Dict.insert "encodeValue" [ "Json", "Encode" ]
                    , aliases =
                        Dict.empty
                            |> Dict.insert [ "JD" ] [ "Json", "Decode" ]
                            |> Dict.insert [ "JE" ] [ "Json", "Encode" ]
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty
                            |> Dict.insert "blarg" (Types.Expression.standardExpression 18)
                            |> Dict.insert "frangle" (Types.Expression.standardExpression 21)
                            |> Dict.insert "blargargle" (Types.Expression.standardExpression 24)
                            |> Dict.insert "toStringCanMakeNumberText" (Types.Expression.standardExpression 28)
                            |> Dict.insert "tupled" (Types.Expression.standardExpression 32)
                            |> Dict.insert "value" (Types.Expression.standardExpression 39)
                    , types =
                        Dict.empty
                            |> Dict.insert "UnaryThing" (Types.Expression.standardExpression 9)
                            |> Dict.insert "BinaryThing" (Types.Expression.standardExpression 12)
                    , typeAliases =
                        Dict.empty
                            |> Dict.insert "Other" (Types.Expression.standardExpression 15)
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "blarg"
                            |> Set.insert "frangle"
                    , types =
                        Set.empty
                            |> Set.insert "UnaryThing"
                            |> Set.insert "BinaryThing"
                            |> Set.insert "Other"
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        [ Reference "Sub"
                        , Reference "tupled"
                        , Reference "BinaryThing"
                        , Reference "UnaryThing"
                        , Reference "One"
                        , Reference "Single"
                        , Reference "frangle"
                        , Reference "blarg"
                        , Reference "blargargle"
                        , Reference "BinaryThing"
                        , Reference "UnaryThing"
                        ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Basics" ] [ Reference "toString" ]
                            |> Dict.insert [ "Json", "Encode" ] [ Reference "Value", Reference "Value", Reference "encodeValue" ]
                    }
        ]


simpleDotElm : String
simpleDotElm =
    """module Simple exposing (blarg, frangle, UnaryThing, BinaryThing(One, Another), Other)

import Basics exposing ((==), toString)
import Dict exposing (Dict, empty)
import Set exposing (Set, insert)
import Result exposing (..)
import Json.Decode as JD exposing (Decoder(..))
import Json.Encode as JE exposing (Value, encodeValue)

type UnaryThing =
    Single

type BinaryThing =
    One | Another | YetAnother UnaryThing

type alias Other =
    BinaryThing

blarg =
    10

frangle =
    "ten"

blargargle : Int -> String -> Bool
blargargle num text =
    toString num == text

toStringCanMakeNumberText : Bool
toStringCanMakeNumberText =
    blargargle blarg frangle

tupled : (UnaryThing, BinaryThing)
tupled =
    (Single, One)

(destructured1, destructured2) =
    tupled

value : JE.Value
value =
    JE.encodeValue

port processReport : (Value -> message) -> Sub message

"""
