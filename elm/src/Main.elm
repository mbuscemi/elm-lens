port module Main exposing (main)

import And
import Dict exposing (Dict)
import Json.Decode
import Model.AllFunctions
import Model.ExposedFunctions
import Set exposing (Set)


type alias Model =
    { exposedFunctions : Dict String (Set String)
    , allFunctions : Dict String (Set String)
    , allFunctionLines : Dict String (Dict String Int)
    }


type Message
    = ProcessFirstLine ( String, String )
    | ProcessAllLines ( String, String )


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { exposedFunctions = Dict.empty
    , allFunctions = Dict.empty
    , allFunctionLines = Dict.empty
    }
        |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFirstLine ( fileName, firstLine ) ->
            Model.ExposedFunctions.record fileName firstLine model
                |> And.noCommand

        ProcessAllLines ( fileName, allLines ) ->
            Model.AllFunctions.record fileName allLines model
                |> And.noCommand


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ processFirstLine ProcessFirstLine
        , processAllLines ProcessAllLines
        ]


port processFirstLine : (( String, String ) -> message) -> Sub message


port processAllLines : (( String, String ) -> message) -> Sub message
