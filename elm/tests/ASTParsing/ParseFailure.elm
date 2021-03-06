module ASTParsing.ParseFailure exposing (parse)

import Dict
import ElmFile
import Expect
import Test exposing (Test, describe, test)
import Types.Exposings
import Types.Imports
import Types.References
import Types.TopLevelExpressions


parse : Test
parse =
    describe "Unparsable Elm File" <|
        let
            fileName =
                "BadFile.elm"

            file =
                ElmFile.makeAst fileName badFileDotElm

            elmFile =
                ElmFile.createBase fileName file
                    |> ElmFile.parseCore fileName file
                    |> ElmFile.parseReferences fileName file Dict.empty
        in
        [ test "has default module name" <|
            \_ ->
                Expect.equal elmFile.moduleName []
        , test "has default imports" <|
            \_ ->
                Expect.equal elmFile.imports Types.Imports.default
        , test "has default top level expressions" <|
            \_ ->
                Expect.equal elmFile.topLevelExpressions Types.TopLevelExpressions.default
        , test "has default exposings" <|
            \_ ->
                Expect.equal elmFile.exposings Types.Exposings.default
        , test "has default references" <|
            \_ ->
                Expect.equal elmFile.references Types.References.default
        ]


badFileDotElm : String
badFileDotElm =
    """Elm Syntax will not parse this file because it does not conform to Elm file standards.
"""
