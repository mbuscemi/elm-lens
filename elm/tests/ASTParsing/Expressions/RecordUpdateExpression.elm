module ASTParsing.Expressions.RecordUpdateExpression exposing (canParseFromRecordUpdate)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromRecordUpdate : Test
canParseFromRecordUpdate =
    describe "Reference in Record Expression" <|
        let
            elmFile =
                ElmFile.fromString "RecordExpression.elm" elmFileText
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Simple" ]
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
                            |> Dict.insert "reference" (Types.Expression.standardExpression 2)
                            |> Dict.insert "recordUpdateExpression" (Types.Expression.standardExpression 6)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "recordUpdateExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "+" [ Types.Reference.make "+" 8 29 8 47 "RecordExpression.elm" ]
                            |> Dict.insert "Int"
                                [ Types.Reference.make "Int" 6 52 6 56 "RecordExpression.elm"
                                , Types.Reference.make "Int" 6 34 6 38 "RecordExpression.elm"
                                , Types.Reference.make "Int" 2 12 2 15 "RecordExpression.elm"
                                ]
                            |> Dict.insert "reference" [ Types.Reference.make "reference" 8 38 8 47 "RecordExpression.elm" ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (recordUpdateExpression)

reference : Int
reference =
    5

recordUpdateExpression : { field: Int } -> { field: Int }
recordUpdateExpression record =
    { record | field = record.field + reference }

"""
