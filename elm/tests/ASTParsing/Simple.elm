module ASTParsing.Simple exposing (canParseSimple, canParseSimpleExposingAll)

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
                            |> Dict.insert "empty" [ "Dict" ]
                            |> Dict.insert "insert" [ "Set" ]
                    , aliases = Dict.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty
                            |> Dict.insert "blarg" (Types.Expression.standardExpression 5)
                            |> Dict.insert "frangle" (Types.Expression.standardExpression 9)
                            |> Dict.insert "blargargle" (Types.Expression.standardExpression 13)
                            |> Dict.insert "toStringCanMakeNumberText" (Types.Expression.standardExpression 17)
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
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        [ Reference "frangle"
                        , Reference "blarg"
                        , Reference "blargargle"
                        , Reference "toString"
                        ]
                    , external =
                        Dict.empty
                    }
        ]


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
                        [ Reference "frangle"
                        , Reference "blarg"
                        , Reference "blargargle"
                        , Reference "toString"
                        ]
                    , external =
                        Dict.empty
                    }
        ]


simpleDotElm : String
simpleDotElm =
    """module Simple exposing (blarg, frangle)

import Dict exposing (empty)
import Set exposing (insert)

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
