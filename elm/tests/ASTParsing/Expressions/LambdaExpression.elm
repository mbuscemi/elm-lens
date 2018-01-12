module ASTParsing.Expressions.LambdaExpression exposing (canParseFromLambda)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromLambda : Test
canParseFromLambda =
    describe "Reference in Lambda Expression" <|
        let
            elmFile =
                ElmFile.fromString "LambdaExpression.elm" elmFileText
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
                            |> Dict.insert "lambdaExpression" (Types.Expression.standardExpression 6)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "lambdaExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "Int" [ Types.Reference.make "Int" 6 19 6 22 "LambdaExpression.elm", Types.Reference.make "Int" 2 12 2 15 "LambdaExpression.elm" ]
                            |> Dict.insert "reference" [ Types.Reference.make "reference" 8 11 8 20 "LambdaExpression.elm" ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (lambdaExpression)

reference : Int
reference =
    5

lambdaExpression : Int
lambdaExpression =
    (\\_ -> reference) ()

"""
