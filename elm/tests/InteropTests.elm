module InteropTests exposing (exposings, imports)

import Dict
import Expect exposing (Expectation)
import Json.Decode exposing (decodeValue)
import Set
import Test exposing (Test, describe, only, test)
import Types.Exposings exposing (Exposings)
import Types.Imports exposing (Imports)


exposings : Test
exposings =
    describe "Exposings" <|
        [ test "can encode and decode" <|
            \_ ->
                let
                    orig =
                        Exposings
                            (Set.singleton "a")
                            (Set.singleton "b")

                    encoded =
                        Types.Exposings.encoder orig

                    decoded =
                        decodeValue Types.Exposings.decoder encoded
                            |> Result.withDefault Types.Exposings.default
                in
                Expect.equal decoded orig
        ]


imports : Test
imports =
    describe "Imports" <|
        [ test "can encode and decode" <|
            \_ ->
                let
                    orig =
                        Dict.empty
                            |> Dict.insert "a" [ "b", "c", "d" ]
                            |> Dict.insert "e" [ "d", "f" ]

                    encoded =
                        Types.Imports.encoder orig

                    decoded =
                        decodeValue Types.Imports.decoder encoded
                            |> Result.withDefault Types.Imports.default
                in
                Expect.equal decoded orig
        ]
