module ASTParsing.ProgramAndTest exposing (canParseProgram, canParseTest)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseProgram : Test
canParseProgram =
    describe "File with Program Function" <|
        let
            elmFile =
                ElmFile.fromString "Main.elm" moduleWithProgram
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Main" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct = Dict.empty
                    , aliases = Dict.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions = Dict.empty |> Dict.insert "main" (Types.Expression.elmEntrypointExpression 5)
                    , types = Dict.empty |> Dict.insert "Message" (Types.Expression.standardExpression 3)
                    , typeAliases = Dict.empty |> Dict.insert "Model" (Types.Expression.standardExpression 2)
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty |> Set.insert "main"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        [ Types.Reference.make "Message" 5 27 5 34
                        , Types.Reference.make "Model" 5 21 5 34
                        , Types.Reference.make "Program" 5 7 5 34
                        ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Cmd" ]
                                [ Types.Reference.make "none" 9 33 9 41
                                , Types.Reference.make "none" 8 22 8 30
                                ]
                            |> Dict.insert [ "Platform" ]
                                [ Types.Reference.make "program" 7 4 7 20 ]
                            |> Dict.insert [ "Sub" ]
                                [ Types.Reference.make "none" 10 26 10 34 ]
                    }
        ]


canParseTest : Test
canParseTest =
    describe "File with Test Function" <|
        let
            elmFile =
                ElmFile.fromString "TruthTest.elm" moduleWithTest
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "TruthTest" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct =
                        Dict.empty
                            |> Dict.insert "Test" [ "Test" ]
                            |> Dict.insert "test" [ "Test" ]
                            |> Dict.insert "describe" [ "Test" ]
                    , aliases = Dict.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty |> Dict.insert "test" (Types.Expression.elmTestExpression 5)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions = Set.empty |> Set.insert "test"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal = []
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Expect" ]
                                [ Types.Reference.make "equal" 11 20 11 32 ]
                            |> Dict.insert [ "Test" ]
                                [ Types.Reference.make "Test" 5 7 5 11
                                , Types.Reference.make "test" 9 12 9 16
                                , Types.Reference.make "describe" 7 4 7 12
                                ]
                    }
        ]


moduleWithProgram : String
moduleWithProgram =
    """module Main exposing (main)

type alias Model = {}
type Message = None

main : Program Never Model Message
main =
    Platform.program
        { init = ({}, Cmd.none)
        , update = (\\_ _ -> ({}, Cmd.none))
        , subscriptions = Sub.none
        }

"""


moduleWithTest : String
moduleWithTest =
    """module TruthTest exposing (test)

import Test exposing (Test, describe, test)
import Expect

test : Test
test =
    describe "a test" <|
        [
            test "truth" <|
                \\_ ->
                    Expect.equal True True
        ]

"""
