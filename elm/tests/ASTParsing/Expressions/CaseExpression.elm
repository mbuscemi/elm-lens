module ASTParsing.Expressions.CaseExpression exposing (canParseFromCase)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromCase : Test
canParseFromCase =
    describe "Reference in Case Expression" <|
        let
            fileName =
                "CaseExpression.elm"

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
                            |> Dict.insert "reference1" (Types.Expression.standardExpression 4)
                            |> Dict.insert "reference2" (Types.Expression.standardExpression 8)
                            |> Dict.insert "reference3" (Types.Expression.standardExpression 12)
                            |> Dict.insert "caseExpression" (Types.Expression.standardExpression 16)
                    , types =
                        Dict.empty
                            |> Dict.insert "Triple" (Types.Expression.standardExpression 2)
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "caseExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "Int"
                                [ Types.Reference.make "Int" 16 27 16 30 "CaseExpression.elm"
                                , Types.Reference.make "Int" 12 13 12 16 "CaseExpression.elm"
                                , Types.Reference.make "Int" 8 13 8 16 "CaseExpression.elm"
                                , Types.Reference.make "Int" 4 13 4 16 "CaseExpression.elm"
                                ]
                            |> Dict.insert "Triple" [ Types.Reference.make "Triple" 16 17 16 24 "CaseExpression.elm" ]
                            |> Dict.insert "reference3" [ Types.Reference.make "reference3" 21 13 21 23 "CaseExpression.elm" ]
                            |> Dict.insert "reference2" [ Types.Reference.make "reference2" 20 13 20 23 "CaseExpression.elm" ]
                            |> Dict.insert "reference1" [ Types.Reference.make "reference1" 19 13 19 23 "CaseExpression.elm" ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (caseExpression)

type Triple = A | B | C

reference1 : Int
reference1 =
    10

reference2 : Int
reference2 =
    15

reference3 : Int
reference3 =
    20

caseExpression : Triple -> Int
caseExpression triple =
    case triple of
        A -> reference1
        B -> reference2
        C -> reference3

"""
