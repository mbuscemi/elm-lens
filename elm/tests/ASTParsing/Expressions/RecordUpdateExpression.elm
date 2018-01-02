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
                    { internal = Dict.singleton "reference" [ Types.Reference.make "reference" 8 38 8 47 "RecordExpression.elm" ]
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
