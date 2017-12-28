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
                        [ Types.Reference.make "reference2" 12 18 12 28
                        , Types.Reference.make "reference1" 12 6 12 16
                        ]
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
