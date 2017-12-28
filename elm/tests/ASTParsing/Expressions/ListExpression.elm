module ASTParsing.Expressions.ListExpression exposing (canParseFromList)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromList : Test
canParseFromList =
    describe "References in List Expression" <|
        let
            elmFile =
                ElmFile.fromString "ListExpression.elm" elmFileText
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
                            |> Dict.insert "reference1" (Types.Expression.standardExpression 2)
                            |> Dict.insert "reference2" (Types.Expression.standardExpression 6)
                            |> Dict.insert "listExpression" (Types.Expression.standardExpression 10)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "listExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        [ Types.Reference.make "reference2" 12 18 12 28
                        , Types.Reference.make "reference1" 12 6 12 16
                        ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (listExpression)

reference1 : String
reference1 =
    "a"

reference2 : String
reference2 =
    "b"

listExpression : Int
listExpression =
    [ reference1, reference2 ]

"""
