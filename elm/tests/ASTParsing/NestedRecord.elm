module ASTParsing.NestedRecord exposing (canParse)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParse : Test
canParse =
    describe "Nested Record Elm File" <|
        let
            fileName =
                "NestedRecord.elm"

            file =
                ElmFile.makeAst fileName nestedRecordDotElm

            elmFile =
                ElmFile.createBase fileName file
                    |> ElmFile.parseCore fileName file
                    |> ElmFile.parseReferences fileName file Dict.empty
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "NestedRecord" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct = Dict.empty
                    , aliases = Dict.empty
                    , unqualified = Set.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty
                            |> Dict.insert "someRecord" (Types.Expression.standardExpression 2)
                            |> Dict.insert "nested" (Types.Expression.standardExpression 6)
                    , types =
                        Dict.empty
                    , typeAliases =
                        Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "nested"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "String"
                                [ Types.Reference.make "String" 6 9 6 15 "NestedRecord.elm"
                                , Types.Reference.make "String" 2 25 2 32 "NestedRecord.elm"
                                ]
                            |> Dict.insert "someRecord" [ Types.Reference.make "someRecord" 8 4 8 14 "NestedRecord.elm" ]
                    , external =
                        Dict.empty
                    }
        ]


nestedRecordDotElm : String
nestedRecordDotElm =
    """module NestedRecord exposing (nested)

someRecord : { a : { b : String } }
someRecord =
    { a = { b = "blarg" } }

nested : String
nested =
    someRecord.a.b

"""
