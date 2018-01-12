module ASTParsing.Infixes exposing (canParse)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParse : Test
canParse =
    describe "Infix Elm File" <|
        let
            elmFile =
                ElmFile.fromString "Infix.elm" infixDotElm
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "Infix" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct =
                        Dict.empty
                    , aliases =
                        Dict.empty
                    , unqualified =
                        Set.empty
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty
                            |> Dict.insert "$$" (Types.Expression.standardExpression 2)
                            |> Dict.insert "blarg" (Types.Expression.standardExpression 6)
                    , types =
                        Dict.empty
                    , typeAliases =
                        Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "$$"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "$$" [ Types.Reference.make "$$" 8 4 8 23 "Infix.elm" ]
                            |> Dict.insert "++"
                                [ Types.Reference.make "++" 4 9 4 20 "Infix.elm"
                                , Types.Reference.make "++" 4 4 4 20 "Infix.elm"
                                ]
                            |> Dict.insert "String"
                                [ Types.Reference.make "String" 6 18 6 24 "Infix.elm"
                                , Types.Reference.make "String" 6 8 6 15 "Infix.elm"
                                , Types.Reference.make "String" 2 27 2 33 "Infix.elm"
                                , Types.Reference.make "String" 2 17 2 24 "Infix.elm"
                                , Types.Reference.make "String" 2 7 2 14 "Infix.elm"
                                ]
                    , external =
                        Dict.empty
                    }
        ]


infixDotElm : String
infixDotElm =
    """module Infix exposing (($$))

($$) : String -> String -> String
($$) a b =
    a ++ " $$ " ++ b

blarg : String -> String
blarg string =
    string $$ "frangle"

infix 9 $$

"""
