module ASTParsing.Expressions.RecordExpression exposing (canParseFromRecord)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromRecord : Test
canParseFromRecord =
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
                            |> Dict.insert "recordExpression" (Types.Expression.standardExpression 6)
                            |> Dict.insert "otherRecordExpression" (Types.Expression.standardExpression 10)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "recordExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal = [ Types.Reference.make "reference" 8 14 8 23 ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (recordExpression)

reference : Int
reference =
    5

recordExpression : { field: Int }
recordExpression =
    { field = reference }

otherRecordExpression : { record | field : Int } -> Int
otherRecordExpression record =
    .field record

"""
