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
            fileName =
                "Simple.elm"

            elmFile =
                ElmFile.fromString fileName simpleDotElm
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
                    , unqualified =
                        Set.empty
                            |> Set.insert [ "Result" ]
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
                        Dict.empty
                            |> Dict.insert "Sub" [ Types.Reference.make "Sub" 43 43 43 54 fileName ]
                            |> Dict.insert "String" [ Types.Reference.make "String" 24 20 24 27 fileName ]
                            |> Dict.insert "Int" [ Types.Reference.make "Int" 24 13 24 17 fileName ]
                            |> Dict.insert "tupled" [ Types.Reference.make "tupled" 37 4 37 10 fileName ]
                            |> Dict.insert "BinaryThing"
                                [ Types.Reference.make "BinaryThing" 32 22 32 33 fileName
                                , Types.Reference.make "BinaryThing" 16 4 16 15 fileName
                                ]
                            |> Dict.insert "Bool"
                                [ Types.Reference.make "Bool" 28 28 28 32 fileName
                                , Types.Reference.make "Bool" 24 30 24 34 fileName
                                ]
                            |> Dict.insert "UnaryThing"
                                [ Types.Reference.make "UnaryThing" 32 10 32 20 fileName
                                , Types.Reference.make "UnaryThing" 13 31 13 41 fileName
                                ]
                            |> Dict.insert "One" [ Types.Reference.make "One" 34 13 34 16 fileName ]
                            |> Dict.insert "Single" [ Types.Reference.make "Single" 34 5 34 11 fileName ]
                            |> Dict.insert "frangle" [ Types.Reference.make "frangle" 30 21 30 28 fileName ]
                            |> Dict.insert "blarg" [ Types.Reference.make "blarg" 30 15 30 20 fileName ]
                            |> Dict.insert "blargargle" [ Types.Reference.make "blargargle" 30 4 30 14 fileName ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Basics" ]
                                (Dict.empty
                                    |> Dict.insert "==" [ Types.Reference.make "==" 26 4 26 24 fileName ]
                                    |> Dict.insert "toString" [ Types.Reference.make "toString" 26 4 26 12 fileName ]
                                )
                            |> Dict.insert [ "Json", "Encode" ]
                                (Dict.empty
                                    |> Dict.insert "Value"
                                        [ Types.Reference.make "Value" 43 22 43 28 fileName
                                        , Types.Reference.make "Value" 39 8 39 16 fileName
                                        ]
                                    |> Dict.insert "encodeValue" [ Types.Reference.make "encodeValue" 41 4 41 18 fileName ]
                                )
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
