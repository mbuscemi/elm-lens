module ASTParsing.UnqualifiedImports exposing (canParse)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParse : Test
canParse =
    describe "Elm File with Unqualified Imports" <|
        let
            fileName =
                "UnqualifiedImports.elm"

            file =
                ElmFile.makeAst fileName unqualifiedImports

            elmFile =
                ElmFile.createBase fileName file
                    |> ElmFile.parseCore fileName file
                    |> ElmFile.parseReferences fileName file Dict.empty
        in
        [ test "has expected module name" <|
            \_ ->
                Expect.equal elmFile.moduleName [ "UnqualifiedImports" ]
        , test "has expected imports" <|
            \_ ->
                Expect.equal elmFile.imports
                    { direct =
                        Dict.empty
                    , aliases =
                        Dict.empty
                            |> Dict.insert [ "F" ] [ "Frangle" ]
                    , unqualified =
                        Set.empty
                            |> Set.insert [ "Frangle" ]
                            |> Set.insert [ "Blarg" ]
                    }
        , test "has expected top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions
                    { functions =
                        Dict.empty
                            |> Dict.insert "blarg" (Types.Expression.standardExpression 5)
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
                            |> Set.insert "blarg"
                    , types =
                        Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "Int"
                                [ Types.Reference.make "Int" 5 8 5 11 "UnqualifiedImports.elm"
                                ]
                    , external =
                        Dict.empty
                    }
        ]


unqualifiedImports : String
unqualifiedImports =
    """module UnqualifiedImports exposing (blarg)

import Blarg exposing (..)
import Frangle as F exposing (..)

blarg : Int
blarg =
    10

"""
