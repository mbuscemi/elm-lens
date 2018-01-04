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
                        Dict.empty
                            |> Dict.insert "Message" [ Types.Reference.make "Message" 5 27 5 34 "Main.elm" ]
                            |> Dict.insert "Model" [ Types.Reference.make "Model" 5 21 5 34 "Main.elm" ]
                            |> Dict.insert "Never" [ Types.Reference.make "Never" 5 15 5 34 "Main.elm" ]
                            |> Dict.insert "Program" [ Types.Reference.make "Program" 5 7 5 34 "Main.elm" ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Cmd" ]
                                (Dict.singleton "none"
                                    [ Types.Reference.make "none" 9 33 9 41 "Main.elm"
                                    , Types.Reference.make "none" 8 22 8 30 "Main.elm"
                                    ]
                                )
                            |> Dict.insert [ "Platform" ]
                                (Dict.singleton "program" [ Types.Reference.make "program" 7 4 7 20 "Main.elm" ])
                            |> Dict.insert [ "Sub" ]
                                (Dict.singleton "none" [ Types.Reference.make "none" 10 26 10 34 "Main.elm" ])
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
                    { internal =
                        Dict.empty
                            |> Dict.insert "<|"
                                [ Types.Reference.make "<|" 9 12 11 42 "TruthTest.elm"
                                , Types.Reference.make "<|" 7 4 12 9 "TruthTest.elm"
                                ]
                            |> Dict.insert "True"
                                [ Types.Reference.make "True" 11 38 11 42 "TruthTest.elm"
                                , Types.Reference.make "True" 11 33 11 37 "TruthTest.elm"
                                ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Expect" ]
                                (Dict.singleton "equal" [ Types.Reference.make "equal" 11 20 11 32 "TruthTest.elm" ])
                            |> Dict.insert [ "Test" ]
                                (Dict.empty
                                    |> Dict.insert "Test" [ Types.Reference.make "Test" 5 7 5 11 "TruthTest.elm" ]
                                    |> Dict.insert "test" [ Types.Reference.make "test" 9 12 9 16 "TruthTest.elm" ]
                                    |> Dict.insert "describe" [ Types.Reference.make "describe" 7 4 7 12 "TruthTest.elm" ]
                                )
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
