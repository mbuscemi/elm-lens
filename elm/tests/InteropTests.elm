module InteropTests exposing (exposings, imports, reference, references, report, topLevelExpressions)

import Dict
import Expect exposing (Expectation)
import Json.Decode exposing (decodeValue)
import Set
import Test exposing (Test, describe, only, test)
import Types.Exposings exposing (Exposings)
import Types.Expression exposing (Expression)
import Types.Imports exposing (Imports)
import Types.Reference exposing (Reference)
import Types.References exposing (References)
import Types.Report exposing (Report)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


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
                        Imports
                            (Dict.empty
                                |> Dict.insert "a" [ "b", "c", "d" ]
                                |> Dict.insert "e" [ "d", "f" ]
                            )
                            (Dict.empty
                                |> Dict.insert [ "g" ] [ "h", "i", "k" ]
                                |> Dict.insert [ "l", "m" ] [ "n", "o" ]
                            )

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
        [ test "can encode and decode" <|
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


report : Test
report =
    describe "Report" <|
        [ test "can encode and decode" <|
            \_ ->
                let
                    orig =
                        Report
                            "file name"
                            [ "module", "name" ]
                            (TopLevelExpressions
                                (Dict.singleton "a" (Expression 123))
                                (Dict.singleton "b" (Expression 234))
                                (Dict.singleton "c" (Expression 345))
                            )
                            (Exposings
                                (Set.singleton "ur")
                                (Set.singleton "mom")
                            )
                            (References
                                [ Reference "dgsklh", Reference "sdfljk" ]
                                (Dict.empty
                                    |> Dict.insert [ "fds", "xcv", "qwe" ] [ Reference "hj", Reference "io" ]
                                    |> Dict.insert [ "gyu", "xsq" ] [ Reference "tuyi", Reference "fas" ]
                                )
                            )

                    encoded =
                        Types.Report.encoder orig

                    decoded =
                        decodeValue Types.Report.decoder encoded
                            |> Result.withDefault Types.Report.default
                in
                Expect.equal decoded orig
        ]


topLevelExpressions : Test
topLevelExpressions =
    describe "TopLevelExpressions" <|
        [ test "can encode and decode" <|
            \_ ->
                let
                    orig =
                        TopLevelExpressions
                            (Dict.singleton "vdsohjn" (Expression 329))
                            (Dict.singleton "hjoiash" (Expression 672))
                            (Dict.singleton "fdoktjr" (Expression 784))

                    encoded =
                        Types.TopLevelExpressions.encoder orig

                    decoded =
                        decodeValue Types.TopLevelExpressions.decoder encoded
                            |> Result.withDefault Types.TopLevelExpressions.default
                in
                Expect.equal decoded orig
        ]
