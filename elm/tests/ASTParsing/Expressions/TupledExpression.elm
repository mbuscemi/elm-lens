module ASTParsing.Expressions.TupledExpression exposing (canParseFromTupled)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromTupled : Test
canParseFromTupled =
    describe "References in Tupled Expression" <|
        let
            elmFile =
                ElmFile.fromString "TupledExpression.elm" elmFileText
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Simple" ]
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
                            |> Dict.insert "reference1" (Types.Expression.standardExpression 2)
                            |> Dict.insert "reference2" (Types.Expression.standardExpression 6)
                            |> Dict.insert "tupledExpression" (Types.Expression.standardExpression 10)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "tupledExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "Int"
                                [ Types.Reference.make "Int" 10 19 10 22 "TupledExpression.elm"
                                , Types.Reference.make "Int" 6 13 6 16 "TupledExpression.elm"
                                ]
                            |> Dict.insert "String" [ Types.Reference.make "String" 2 13 2 19 "TupledExpression.elm" ]
                            |> Dict.insert "reference2" [ Types.Reference.make "reference2" 12 18 12 28 "TupledExpression.elm" ]
                            |> Dict.insert "reference1" [ Types.Reference.make "reference1" 12 6 12 16 "TupledExpression.elm" ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (tupledExpression)

reference1 : String
reference1 =
    "a"

reference2 : Int
reference2 =
    1

tupledExpression : Int
tupledExpression =
    ( reference1, reference2 )

"""
