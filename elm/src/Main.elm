port module Main exposing (main)

import And
import Dict exposing (Dict)
import Json.Decode
import Model.AllFunctions
import Model.ExposedFunctions
import Model.Report
import Set exposing (Set)


type alias Model =
    { exposedFunctions : Dict String (Set String)
    , allFunctions : Dict String (Set String)
    , allFunctionLines : Dict String (Dict String Int)
    }


type Message
    = ProcessLines ( String, String, String )


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
        ProcessLines ( fileName, firstLine, allLines ) ->
            Model.ExposedFunctions.record fileName firstLine model
                |> Model.AllFunctions.record fileName allLines
                |> andSendReport fileName


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    And.execute (report <| Model.Report.make fileName model) model


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ process ProcessLines
        ]


port report : ( String, List ( String, Int, Bool ) ) -> Cmd message


port process : (( String, String, String ) -> message) -> Sub message
