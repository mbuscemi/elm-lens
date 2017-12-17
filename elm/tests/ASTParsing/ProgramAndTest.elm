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
                    { internal = [ Reference "Message", Reference "Model", Reference "Program" ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Cmd" ] [ Reference "none", Reference "none" ]
                            |> Dict.insert [ "Platform" ] [ Reference "program" ]
                            |> Dict.insert [ "Sub" ] [ Reference "none" ]
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
                            |> Dict.insert [ "Expect" ] [ Reference "equal" ]
                            |> Dict.insert [ "Test" ] [ Reference "Test", Reference "test", Reference "describe" ]
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
