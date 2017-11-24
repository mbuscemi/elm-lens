port module Main exposing (main)

import And
import Dict exposing (Dict)
import Json.Decode exposing (Decoder, decodeValue, field, string)
import Json.Encode exposing (Value)
import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias FileData =
    { topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : List Reference
    }


type alias Model =
    Dict String FileData


type Message
    = AddFileData Value


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    Dict.empty |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        AddFileData value ->
            model
                |> Dict.insert (decode value "fileName" string "")
                    { topLevelExpressions = decode value "topLevelExpressions" Types.TopLevelExpressions.decoder Types.TopLevelExpressions.default
                    , exposings = decode value "exposings" Types.Exposings.decoder Types.Exposings.default
                    , references = decode value "references" Types.Reference.listDecoder [ Types.Reference.default ]
                    }
                |> And.noCommand


decode : Value -> String -> Decoder something -> something -> something
decode value fieldName decoder default =
    decodeValue (field fieldName decoder) value
        |> Result.withDefault default


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ processReport AddFileData ]


port processReport : (Value -> message) -> Sub message
