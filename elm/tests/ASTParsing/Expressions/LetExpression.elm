module ASTParsing.Expressions.LetExpression exposing (canParseFromLet)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromLet : Test
canParseFromLet =
    describe "Reference in Let Expression" <|
        let
            elmFile =
                ElmFile.fromString "LetExpression.elm" elmFileText
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
                            |> Dict.insert "letExpression" (Types.Expression.standardExpression 10)
                            |> Dict.insert "letDestructuring" (Types.Expression.standardExpression 18)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "letExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        [ Reference "reference2"
                        , Reference "first"
                        , Reference "reference1"
                        , Reference "incremented"
                        ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (letExpression)

reference1 : Int
reference1 =
    1

reference2 : ( Int, Int )
reference2 =
    ( 2, 3 )

letExpression : Int
letExpression =
    let
        incremented =
            reference1 + 1
    in
    incremented + 1

letDestructuring : Int
letDestructuring =
    let
        ( first, second ) =
            reference2
    in
    first

"""
