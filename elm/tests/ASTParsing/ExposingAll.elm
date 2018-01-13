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
            fileName =
                "Simple.elm"

            file =
                ElmFile.makeAst fileName simpleExposingAll

            elmFile =
                ElmFile.createBase fileName file
                    |> ElmFile.parseCore fileName file
                    |> ElmFile.parseReferences fileName file Dict.empty
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Simple" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct = Dict.empty
                    , aliases = Dict.empty
                    , unqualified = Set.empty
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
                        Dict.empty
                            |> Dict.insert "==" [ Types.Reference.make "==" 12 4 12 24 "Simple.elm" ]
                            |> Dict.insert "Bool" [ Types.Reference.make "Bool" 14 28 14 32 "Simple.elm", Types.Reference.make "Bool" 10 30 10 34 "Simple.elm" ]
                            |> Dict.insert "Int" [ Types.Reference.make "Int" 10 13 10 17 "Simple.elm", Types.Reference.make "Int" 2 8 2 11 "Simple.elm" ]
                            |> Dict.insert "String" [ Types.Reference.make "String" 10 20 10 27 "Simple.elm", Types.Reference.make "String" 6 10 6 16 "Simple.elm" ]
                            |> Dict.insert "frangle" [ Types.Reference.make "frangle" 16 21 16 28 "Simple.elm" ]
                            |> Dict.insert "blarg" [ Types.Reference.make "blarg" 16 15 16 20 "Simple.elm" ]
                            |> Dict.insert "blargargle" [ Types.Reference.make "blargargle" 16 4 16 14 "Simple.elm" ]
                            |> Dict.insert "toString" [ Types.Reference.make "toString" 12 4 12 12 "Simple.elm" ]
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
