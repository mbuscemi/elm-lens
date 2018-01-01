module ASTParsing.ExposingAll exposing (canParseSimpleExposingAll)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseSimpleExposingAll : Test
canParseSimpleExposingAll =
    describe "Simple Elm File (Exposing All)" <|
        let
            elmFile =
                ElmFile.fromString "Simple.elm" simpleExposingAll
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Simple" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct = Dict.empty
                    , aliases = Dict.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty
                            |> Dict.insert "blarg" (Types.Expression.standardExpression 2)
                            |> Dict.insert "frangle" (Types.Expression.standardExpression 6)
                            |> Dict.insert "blargargle" (Types.Expression.standardExpression 10)
                            |> Dict.insert "toStringCanMakeNumberText" (Types.Expression.standardExpression 14)
                    , types =
                        Dict.empty
                    , typeAliases =
                        Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "blarg"
                            |> Set.insert "frangle"
                            |> Set.insert "blargargle"
                            |> Set.insert "toStringCanMakeNumberText"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        [ Types.Reference.make "frangle" 16 21 16 28 "Simple.elm"
                        , Types.Reference.make "blarg" 16 15 16 20 "Simple.elm"
                        , Types.Reference.make "blargargle" 16 4 16 14 "Simple.elm"
                        , Types.Reference.make "toString" 12 4 12 12 "Simple.elm"
                        ]
                    , external =
                        Dict.empty
                    }
        ]


simpleExposingAll : String
simpleExposingAll =
    """module Simple exposing (..)

blarg : Int
blarg =
    10

frangle : String
frangle =
    "ten"

blargargle : Int -> String -> Bool
blargargle num text =
    toString num == text

toStringCanMakeNumberText : Bool
toStringCanMakeNumberText =
    blargargle blarg frangle

"""
