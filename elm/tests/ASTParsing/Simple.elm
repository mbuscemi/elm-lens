module ASTParsing.Simple exposing (parse)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


parse : Test
parse =
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
