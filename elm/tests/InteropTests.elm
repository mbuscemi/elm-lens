module InteropTests exposing (exposings, fileLineRequest, imports, reference, references, report, topLevelExpressions)

import Dict
import Expect
import Json.Decode exposing (decodeValue)
import Set
import Test exposing (Test, describe, test)
import Types.Exposings exposing (Exposings)
import Types.Expression exposing (Expression)
import Types.FileLineRequest
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
                        Reference
                            "blarg"
                            { start = { row = 1, column = 2 }, end = { row = 3, column = 4 } }
                            "file.elm"

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
                        [ Types.Reference.make "blarg" 1 2 3 4 "file1.elm"
                        , Types.Reference.make "frangle" 5 6 7 8 "file2.elm"
                        , Types.Reference.make "blargargle" 11 12 13 14 "file3.elm"
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
                            [ Types.Reference.make "abc" 1 2 3 4 "file1.elm"
                            , Types.Reference.make "def" 5 6 7 8 "file2.elm"
                            ]
                            (Dict.empty
                                |> Dict.insert [ "ab", "cd", "de" ]
                                    [ Types.Reference.make "ghi" 1 2 3 4 "file2.elm"
                                    , Types.Reference.make "klm" 5 6 7 8 "file3.elm"
                                    ]
                                |> Dict.insert [ "ed", "fg" ]
                                    [ Types.Reference.make "no" 1 2 3 4 "file3.elm"
                                    , Types.Reference.make "pq" 5 6 7 8 "file4.elm"
                                    ]
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
                                (Dict.singleton "a" (Types.Expression.standardExpression 123))
                                (Dict.singleton "b" (Types.Expression.standardExpression 234))
                                (Dict.singleton "c" (Types.Expression.standardExpression 345))
                            )
                            (Exposings
                                (Set.singleton "ur")
                                (Set.singleton "mom")
                            )
                            (References
                                [ Reference "dgsklh" { start = { row = 1, column = 2 }, end = { row = 3, column = 4 } } "file1.elm"
                                , Reference "sdfljk" { start = { row = 5, column = 6 }, end = { row = 7, column = 8 } } "file1.elm"
                                ]
                                (Dict.empty
                                    |> Dict.insert [ "fds", "xcv", "qwe" ]
                                        [ Reference "hj" { start = { row = 1, column = 2 }, end = { row = 3, column = 4 } } "file1.elm"
                                        , Reference "io" { start = { row = 5, column = 6 }, end = { row = 7, column = 8 } } "file1.elm"
                                        ]
                                    |> Dict.insert [ "gyu", "xsq" ]
                                        [ Reference "tuyi" { start = { row = 1, column = 2 }, end = { row = 3, column = 4 } } "file1.elm"
                                        , Reference "fas" { start = { row = 5, column = 6 }, end = { row = 7, column = 8 } } "file1.elm"
                                        ]
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
                            (Dict.singleton "vdsohjn" (Types.Expression.standardExpression 329))
                            (Dict.singleton "hjoiash" (Types.Expression.standardExpression 672))
                            (Dict.singleton "fdoktjr" (Types.Expression.standardExpression 784))

                    encoded =
                        Types.TopLevelExpressions.encoder orig

                    decoded =
                        decodeValue Types.TopLevelExpressions.decoder encoded
                            |> Result.withDefault Types.TopLevelExpressions.default
                in
                Expect.equal decoded orig
        ]


fileLineRequest : Test
fileLineRequest =
    describe "FileLineRequest" <|
        [ test "can encode and decode" <|
            \_ ->
                let
                    orig =
                        Dict.empty
                            |> Dict.insert "a" (Set.fromList [ 1, 2, 3 ])
                            |> Dict.insert "b" (Set.fromList [ 4 ])

                    encoded =
                        Types.FileLineRequest.encoder orig

                    decoded =
                        decodeValue Types.FileLineRequest.decoder encoded
                            |> Result.withDefault Types.FileLineRequest.default
                in
                Expect.equal decoded orig
        ]
