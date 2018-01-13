module Model.ReportTest exposing (canMake)

import Dict
import ElmFile
import Expect
import Json.Decode exposing (decodeValue)
import Model.Report
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)
import Types.Report


canMake : Test
canMake =
    describe "Model.Report.make" <|
        let
            fileName =
                "File.elm"

            file =
                ElmFile.makeAst fileName anElmFile

            elmFile =
                ElmFile.createBase fileName file
                    |> ElmFile.parseCore fileName file
                    |> ElmFile.parseReferences fileName file Dict.empty

            report =
                Model.Report.make fileName elmFile
                    |> decodeValue Types.Report.decoder
                    |> Result.withDefault Types.Report.default
        in
        [ describe "formats report as expected" <|
            [ test "has expected file name" <|
                \_ ->
                    Expect.equal
                        fileName
                        report.fileName
            , test "has expected module name" <|
                \_ ->
                    Expect.equal
                        [ "An", "Elm", "File" ]
                        report.moduleName
            , test "has expected top level expressions" <|
                \_ ->
                    Expect.equal
                        { functions =
                            Dict.empty
                                |> Dict.insert "blarg" (Types.Expression.standardExpression 12)
                                |> Dict.insert "frangle" (Types.Expression.standardExpression 15)
                                |> Dict.insert "blargargle" (Types.Expression.standardExpression 18)
                                |> Dict.insert "toStringCanMakeNumberText" (Types.Expression.standardExpression 22)
                        , types =
                            Dict.empty
                                |> Dict.insert "UnaryThing" (Types.Expression.standardExpression 6)
                        , typeAliases =
                            Dict.empty
                                |> Dict.insert "Other" (Types.Expression.standardExpression 9)
                        }
                        report.topLevelExpressions
            , test "has expected exposings" <|
                \_ ->
                    Expect.equal
                        { functions =
                            Set.empty
                                |> Set.insert "blarg"
                                |> Set.insert "frangle"
                        , types =
                            Set.empty
                        }
                        report.exposings
            , test "has expected references" <|
                \_ ->
                    Expect.equal
                        { internal =
                            Dict.empty
                                |> Dict.insert "Bool"
                                    [ Types.Reference.make "Bool" 22 28 22 32 fileName
                                    , Types.Reference.make "Bool" 18 30 18 34 fileName
                                    ]
                                |> Dict.insert "Int" [ Types.Reference.make "Int" 18 13 18 17 fileName ]
                                |> Dict.insert "String" [ Types.Reference.make "String" 18 20 18 27 fileName ]
                                |> Dict.insert "frangle" [ Types.Reference.make "frangle" 24 21 24 28 fileName ]
                                |> Dict.insert "blarg" [ Types.Reference.make "blarg" 24 15 24 20 fileName ]
                                |> Dict.insert "blargargle" [ Types.Reference.make "blargargle" 24 4 24 14 fileName ]
                                |> Dict.insert "UnaryThing" [ Types.Reference.make "UnaryThing" 10 4 10 14 fileName ]
                        , external =
                            Dict.empty
                                |> Dict.insert [ "Basics" ]
                                    (Dict.empty
                                        |> Dict.insert "==" [ Types.Reference.make "==" 20 4 20 24 fileName ]
                                        |> Dict.insert "toString" [ Types.Reference.make "toString" 20 4 20 12 fileName ]
                                    )
                        }
                        report.references
            ]
        ]


anElmFile : String
anElmFile =
    """module An.Elm.File exposing (blarg, frangle)

import Basics exposing ((==), toString)
import Dict exposing (Dict, empty)
import Set exposing (Set, insert)

type UnaryThing =
    Single

type alias Other =
    UnaryThing

blarg =
    10

frangle =
    "ten"

blargargle : Int -> String -> Bool
blargargle num text =
    toString num == text

toStringCanMakeNumberText : Bool
toStringCanMakeNumberText =
    blargargle blarg frangle

"""
