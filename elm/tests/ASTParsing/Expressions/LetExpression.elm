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
            fileName =
                "LetExpression.elm"

            file =
                ElmFile.makeAst fileName elmFileText

            elmFile =
                ElmFile.createBase fileName file
                    |> ElmFile.parseCore fileName file
                    |> ElmFile.parseReferences fileName file Dict.empty
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
                            |> Dict.insert "letExpression" (Types.Expression.standardExpression 10)
                            |> Dict.insert "letDestructuring" (Types.Expression.standardExpression 19)
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
                        Dict.empty
                            |> Dict.insert "+"
                                [ Types.Reference.make "+" 15 12 15 26 "LetExpression.elm"
                                , Types.Reference.make "+" 17 4 17 19 "LetExpression.elm"
                                ]
                            |> Dict.insert "Int"
                                [ Types.Reference.make "Int" 19 19 19 22 "LetExpression.elm"
                                , Types.Reference.make "Int" 10 16 10 19 "LetExpression.elm"
                                , Types.Reference.make "Int" 13 22 13 25 "LetExpression.elm"
                                , Types.Reference.make "Int" 6 20 6 24 "LetExpression.elm"
                                , Types.Reference.make "Int" 6 15 6 18 "LetExpression.elm"
                                , Types.Reference.make "Int" 2 13 2 16 "LetExpression.elm"
                                ]
                            |> Dict.insert "reference2" [ Types.Reference.make "reference2" 23 12 23 22 "LetExpression.elm" ]
                            |> Dict.insert "first" [ Types.Reference.make "first" 25 4 25 9 "LetExpression.elm" ]
                            |> Dict.insert "reference1" [ Types.Reference.make "reference1" 15 12 15 22 "LetExpression.elm" ]
                            |> Dict.insert "incremented" [ Types.Reference.make "incremented" 17 4 17 15 "LetExpression.elm" ]
                    , external =
                        Dict.empty
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
        incremented : Int
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
