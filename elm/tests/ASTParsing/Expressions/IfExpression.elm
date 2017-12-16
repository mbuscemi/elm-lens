module ASTParsing.Expressions.IfExpression exposing (canParseFromIf)

import Dict
import ElmFile
import Expect
import Set
import Test exposing (Test, describe, test)
import Types.Expression
import Types.Reference exposing (Reference)


canParseFromIf : Test
canParseFromIf =
    describe "Reference in If Expression" <|
        let
            elmFile =
                ElmFile.fromString "IfExpression.elm" elmFileText
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
                            |> Dict.insert "reference" (Types.Expression.standardExpression 2)
                            |> Dict.insert "ifExpression" (Types.Expression.standardExpression 6)
                    , types = Dict.empty
                    , typeAliases = Dict.empty
                    }
        , test "has expected exposings" <|
            \_ ->
                Expect.equal elmFile.exposings
                    { functions =
                        Set.empty
                            |> Set.insert "ifExpression"
                    , types = Set.empty
                    }
        , test "has expected references" <|
            \_ ->
                Expect.equal elmFile.references
                    { internal = [ Reference "reference" ]
                    , external = Dict.empty
                    }
        ]


elmFileText : String
elmFileText =
    """module Simple exposing (ifExpression)

reference : String
reference =
    "reference"

ifExpression : Bool -> String
ifExpression canReference =
    if canReference then
        reference
    else
        "nope"

"""
