port module Main exposing (main)

import And
import Dict exposing (Dict)
import Types.Report exposing (Report)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias FileData =
    { topLevelExpressions : TopLevelExpressions
    }


type alias Model =
    Dict String FileData


type Message
    = AddFileData Report


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
        AddFileData report ->
            model
                |> Dict.insert report.fileName { topLevelExpressions = report.topLevelExpressions }
                |> And.noCommand


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ processReport AddFileData ]


port processReport : (Report -> message) -> Sub message
