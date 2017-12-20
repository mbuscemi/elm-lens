module And.CoreTest exposing (canDoNothing, canExecute)

import And
import Expect
import Task exposing (Task)
import Test exposing (Test, describe, test)


canDoNothing : Test
canDoNothing =
    describe "And.doNothing" <|
        [ test "returns the model tupled with a Cmd.none" <|
            \_ ->
                let
                    model =
                        {}

                    actual =
                        And.doNothing model
                in
                Expect.all
                    [ \a -> Expect.equal model (Tuple.first a)
                    , \a -> Expect.equal Cmd.none (Tuple.second a)
                    ]
                    actual
        ]


canExecute : Test
canExecute =
    describe "And.execute" <|
        [ test "returns the model and command tupled" <|
            \_ ->
                let
                    model =
                        {}

                    command =
                        Task.perform (always "a") (Task.succeed "b")

                    actual =
                        And.execute model command
                in
                Expect.all
                    [ \a -> Expect.equal model (Tuple.first a)
                    , \a -> Expect.equal command (Tuple.second a)
                    ]
                    actual
        ]
