port module Main exposing (main)

import And
import Json.Decode
import Model.ExposedFunctions


type alias Model =
    { exposedFunctions : List String }


type Message
    = ProcessFirstLine String


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { exposedFunctions = [] } |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFirstLine firstLine ->
            Model.ExposedFunctions.record firstLine model
                |> And.noCommand


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ processFirstLine ProcessFirstLine ]


port processFirstLine : (String -> message) -> Sub message
