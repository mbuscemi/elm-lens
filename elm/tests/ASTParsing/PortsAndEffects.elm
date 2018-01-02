module ASTParsing.PortsAndEffects exposing (canParseEffects, canParsePort)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParsePort : Test
canParsePort =
    describe "Simple Ports File" <|
        let
            elmFile =
                ElmFile.fromString "SimplePort.elm" simplePortModule
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "SimplePort" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct = Dict.empty
                    , aliases = Dict.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions = Dict.empty |> Dict.insert "blarg" (Types.Expression.standardExpression 2)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty |> Set.insert "blarg"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal = Dict.empty
                    , external = Dict.empty
                    }
        ]


canParseEffects : Test
canParseEffects =
    describe "Simple Effects File" <|
        let
            elmFile =
                ElmFile.fromString "SimpleEffects.elm" simpleEffectsModule
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "SimpleEffects" ]
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
                            |> Dict.insert "cmdMap" (Types.Expression.standardExpression 32)
                            |> Dict.insert "init" (Types.Expression.standardExpression 17)
                            |> Dict.insert "onEffects" (Types.Expression.standardExpression 22)
                            |> Dict.insert "onSelfMsg" (Types.Expression.standardExpression 27)
                    , types =
                        Dict.empty
                            |> Dict.insert "SomeCmd" (Types.Expression.standardExpression 5)
                            |> Dict.insert "SomeState" (Types.Expression.standardExpression 9)
                    , typeAliases =
                        Dict.empty
                            |> Dict.insert "SomeTask" (Types.Expression.standardExpression 13)
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "cmdMap"
                            |> Set.insert "init"
                            |> Set.insert "onEffects"
                            |> Set.insert "onSelfMsg"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "SomeCmd"
                                [ Types.Reference.make "SomeCmd" 32 34 32 43 "SimpleEffects.elm"
                                , Types.Reference.make "SomeCmd" 32 21 32 30 "SimpleEffects.elm"
                                , Types.Reference.make "SomeCmd" 27 49 27 60 "SimpleEffects.elm"
                                , Types.Reference.make "SomeCmd" 27 32 27 45 "SimpleEffects.elm"
                                , Types.Reference.make "SomeCmd" 22 54 22 67 "SimpleEffects.elm"
                                , Types.Reference.make "SomeCmd" 22 32 22 45 "SimpleEffects.elm"
                                ]
                            |> Dict.insert "NoOp"
                                [ Types.Reference.make "NoOp" 34 4 34 8 "SimpleEffects.elm" ]
                            |> Dict.insert "SomeTask"
                                [ Types.Reference.make "SomeTask" 27 81 27 93 "SimpleEffects.elm"
                                , Types.Reference.make "SomeTask" 22 88 22 100 "SimpleEffects.elm"
                                , Types.Reference.make "SomeTask" 17 7 17 19 "SimpleEffects.elm"
                                ]
                            |> Dict.insert "SomeState"
                                [ Types.Reference.make "SomeState" 27 64 27 77 "SimpleEffects.elm"
                                , Types.Reference.make "SomeState" 22 71 22 84 "SimpleEffects.elm"
                                , Types.Reference.make "SomeState" 14 24 14 39 "SimpleEffects.elm"
                                ]
                            |> Dict.insert "State"
                                [ Types.Reference.make "State" 29 18 29 23 "SimpleEffects.elm"
                                , Types.Reference.make "State" 24 18 24 23 "SimpleEffects.elm"
                                , Types.Reference.make "State" 19 18 19 23 "SimpleEffects.elm"
                                ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Task" ]
                                [ Types.Reference.make "succeed" 29 4 29 16 "SimpleEffects.elm"
                                , Types.Reference.make "succeed" 24 4 24 16 "SimpleEffects.elm"
                                , Types.Reference.make "succeed" 19 4 19 16 "SimpleEffects.elm"
                                ]
                            |> Dict.insert [ "Platform" ]
                                [ Types.Reference.make "Router" 27 12 27 45 "SimpleEffects.elm"
                                , Types.Reference.make "Router" 22 12 22 45 "SimpleEffects.elm"
                                ]
                    }
        ]


simplePortModule : String
simplePortModule =
    """port module SimplePort exposing (blarg)

blarg : Int
blarg =
    10

"""


simpleEffectsModule : String
simpleEffectsModule =
    """effect module SimpleEffects where { command = SomeCmd } exposing (cmdMap, init, onEffects, onSelfMsg)

import Task


type SomeCmd msg
    = NoOp


type SomeState x
    = State ()


type alias SomeTask msg =
    Platform.Task Never (SomeState msg)


init : SomeTask msg
init =
    Task.succeed (State ())


onEffects : Platform.Router msg (SomeCmd msg) -> List (SomeCmd msg) -> SomeState msg -> SomeTask msg
onEffects eventmsgRouterPlatform msgMySubList msgState =
    Task.succeed (State ())


onSelfMsg : Platform.Router msg (SomeCmd msg) -> SomeCmd msg -> SomeState msg -> SomeTask msg
onSelfMsg router dimensions state =
    Task.succeed (State ())


cmdMap : (a -> b) -> SomeCmd a -> SomeCmd b
cmdMap function aSomeCmd =
    NoOp

"""
