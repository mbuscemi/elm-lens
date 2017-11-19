port module Main exposing (main)

import And
import Json.Decode
import Model.AllFunctions
import Model.ExposedFunctions
import Set exposing (Set)


type alias Model =
    { exposedFunctions : List String
    , allFunctions : Set String
    }


type Message
    = ProcessFirstLine String
    | ProcessAllLines String


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { exposedFunctions = []
    , allFunctions = Set.empty
    }
        |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFirstLine firstLine ->
            Model.ExposedFunctions.record firstLine model
                |> And.noCommand

        ProcessAllLines allLines ->
            Model.AllFunctions.record allLines model
                |> And.noCommand


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ processFirstLine ProcessFirstLine
        , processAllLines ProcessAllLines
        ]


port processFirstLine : (String -> message) -> Sub message


port processAllLines : (String -> message) -> Sub message
