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
                    { internal = []
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
                        [ Reference "SomeCmd"
                        , Reference "SomeCmd"
                        , Reference "NoOp"
                        , Reference "SomeTask"
                        , Reference "SomeState"
                        , Reference "SomeCmd"
                        , Reference "SomeCmd"
                        , Reference "State"
                        , Reference "SomeTask"
                        , Reference "SomeState"
                        , Reference "SomeCmd"
                        , Reference "SomeCmd"
                        , Reference "State"
                        , Reference "SomeTask"
                        , Reference "State"
                        , Reference "SomeState"
                        ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "Task" ] [ Reference "succeed", Reference "succeed", Reference "succeed" ]
                            |> Dict.insert [ "Platform" ] [ Reference "Router", Reference "Router" ]
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
