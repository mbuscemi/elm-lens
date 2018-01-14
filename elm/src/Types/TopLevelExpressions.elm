module Types.TopLevelExpressions exposing (TopLevelExpressions, decoder, default, encoder, hasSymbol)

import Dict exposing (Dict)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.Expression exposing (Expression)


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


encoder : TopLevelExpressions -> Value
encoder expressions =
    JE.object
        [ ( "functions", expressionValue expressions.functions )
        , ( "types", expressionValue expressions.types )
        , ( "typeAliases", expressionValue expressions.typeAliases )
        ]


decoder : Decoder TopLevelExpressions
decoder =
    JD.map3 TopLevelExpressions
        (JD.field "functions" expressionDictDecoder)
        (JD.field "types" expressionDictDecoder)
        (JD.field "typeAliases" expressionDictDecoder)


hasSymbol : String -> TopLevelExpressions -> Bool
hasSymbol symbol exps =
    case ( Dict.get symbol exps.functions, Dict.get symbol exps.types, Dict.get symbol exps.typeAliases ) of
        ( Nothing, Nothing, Nothing ) ->
            False

        _ ->
            True


expressionValue : Dict String Expression -> Value
expressionValue dict =
    Dict.toList dict
        |> List.map (\( name, exp ) -> ( name, Types.Expression.encoder exp ))
        |> JE.object


expressionDictDecoder : Decoder (Dict String Expression)
expressionDictDecoder =
    JD.dict Types.Expression.decoder
