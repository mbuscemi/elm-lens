module InteropTests exposing (exposings, imports, reference, references)

import Dict
import Expect exposing (Expectation)
import Json.Decode exposing (decodeValue)
import Set
import Test exposing (Test, describe, only, test)
import Types.Exposings exposing (Exposings)
import Types.Imports exposing (Imports)
import Types.Reference exposing (Reference)
import Types.References exposing (References)


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


reference : Test
reference =
    describe "Reference" <|
        [ test "can encode and decode single" <|
            \_ ->
                let
                    orig =
                        Reference "blarg"

                    encoded =
                        Types.Reference.encoder orig

                    decoded =
                        decodeValue Types.Reference.decoder encoded
                            |> Result.withDefault Types.Reference.default
                in
                Expect.equal decoded orig
        , test "can encode and decode list" <|
            \_ ->
                let
                    orig =
                        [ Reference "blarg"
                        , Reference "frangle"
                        , Reference "blargargle"
                        ]

                    encoded =
                        Types.Reference.listEncoder orig

                    decoded =
                        decodeValue Types.Reference.listDecoder encoded
                            |> Result.withDefault [ Types.Reference.default ]
                in
                Expect.equal decoded orig
        ]


references : Test
references =
    describe "References" <|
        [ test "can encode and decode " <|
            \_ ->
                let
                    orig =
                        References
                            [ Reference "abc", Reference "def" ]
                            (Dict.empty
                                |> Dict.insert [ "ab", "cd", "de" ] [ Reference "ghi", Reference "klm" ]
                                |> Dict.insert [ "ed", "fg" ] [ Reference "no", Reference "pq" ]
                            )

                    encoded =
                        Types.References.encoder orig

                    decoded =
                        decodeValue Types.References.decoder encoded
                            |> Result.withDefault Types.References.default
                in
                Expect.equal decoded orig
        ]
