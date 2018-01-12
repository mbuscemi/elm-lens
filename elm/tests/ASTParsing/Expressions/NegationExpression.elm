module ASTParsing.Expressions.NegationExpression exposing (canParseFromNegation)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromNegation : Test
canParseFromNegation =
    describe "Reference in Negation Expression" <|
        let
            elmFile =
                ElmFile.fromString "NegationExpression.elm" elmFileText
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
                            |> Dict.insert "reference" (Types.Expression.standardExpression 2)
                            |> Dict.insert "negationExpression" (Types.Expression.standardExpression 6)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "negationExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "Int" [ Types.Reference.make "Int" 6 21 6 24 "NegationExpression.elm", Types.Reference.make "Int" 2 12 2 15 "NegationExpression.elm" ]
                            |> Dict.insert "reference" [ Types.Reference.make "reference" 8 5 8 14 "NegationExpression.elm" ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (negationExpression)

reference : Int
reference =
    5

negationExpression : Int
negationExpression =
    -reference

"""
