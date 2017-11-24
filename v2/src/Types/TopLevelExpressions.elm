module Types.TopLevelExpressions exposing (TopLevelExpressions, Updater, decoder, default, encoder, updateFunctionLineNumber, updateTypeAliasLineNumber, updateTypeLineNumber)

import Dict exposing (Dict)
import Json.Decode as JD exposing (Decoder, dict, field, int, map, map3)
import Json.Encode as JE exposing (Value, int, list, object, string)
import Types.Expression exposing (Expression)


type alias Updater =
    String -> Int -> TopLevelExpressions -> TopLevelExpressions


type alias TopLevelExpressions =
    { functions : Dict String Expression
    , types : Dict String Expression
    , typeAliases : Dict String Expression
    }


default : TopLevelExpressions
default =
    { functions = Dict.empty
    , types = Dict.empty
    , typeAliases = Dict.empty
    }


updateFunctionLineNumber : Updater
updateFunctionLineNumber name lineNumber topLevelExpressions =
    { topLevelExpressions | functions = updateLineNumberFor name lineNumber topLevelExpressions.functions }


updateTypeLineNumber : Updater
updateTypeLineNumber name lineNumber topLevelExpressions =
    { topLevelExpressions | types = updateLineNumberFor name lineNumber topLevelExpressions.types }


updateTypeAliasLineNumber : Updater
updateTypeAliasLineNumber name lineNumber topLevelExpressions =
    { topLevelExpressions | typeAliases = updateLineNumberFor name lineNumber topLevelExpressions.typeAliases }


updateLineNumberFor : String -> Int -> Dict String Expression -> Dict String Expression
updateLineNumberFor functionName lineNumber expressionDict =
    Dict.update
        functionName
        (Maybe.map <| Types.Expression.updateLineNumber lineNumber)
        expressionDict


encoder : TopLevelExpressions -> Value
encoder expressions =
    object
        [ ( "functions", expressionValue expressions.functions )
        , ( "types", expressionValue expressions.types )
        , ( "typeAliases", expressionValue expressions.typeAliases )
        ]


expressionValue : Dict String Expression -> Value
expressionValue dict =
    list <| Dict.foldl expressionFold [] dict


expressionFold : String -> Expression -> List Value -> List Value
expressionFold key expression list =
    object [ ( "name", string key ), ( "lineNumber", JE.int expression.lineNumber ) ] :: list


decoder : Decoder TopLevelExpressions
decoder =
    map3 TopLevelExpressions
        (field "functions" expressionDictDecoder)
        (field "types" expressionDictDecoder)
        (field "typeAliases" expressionDictDecoder)


expressionDictDecoder : Decoder (Dict String Expression)
expressionDictDecoder =
    dict expressionDecoder


expressionDecoder : Decoder Expression
expressionDecoder =
    map Expression
        (field "lineNumber" JD.int)
