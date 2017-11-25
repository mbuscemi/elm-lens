port module Main exposing (main)

import And
import Dict exposing (Dict)
import Json.Encode exposing (Value)
import Model.FileMarkup
import Model.ProjectFileData
import Types.FileMarkup exposing (FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)


type alias Model =
    ProjectFileData


type Message
    = AddFileData Value
    | FileMarkupRequest String


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
                |> Model.ProjectFileData.add value
                |> And.noCommand

        FileMarkupRequest fileName ->
            model
                |> andTransmitFileMarkup fileName


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ processReport AddFileData
        , fileMarkupRequest FileMarkupRequest
        ]


andTransmitFileMarkup : String -> Model -> ( Model, Cmd Message )
andTransmitFileMarkup fileName model =
    And.execute (markupForFile <| Model.FileMarkup.make fileName model) model


port processReport : (Value -> message) -> Sub message


port fileMarkupRequest : (String -> message) -> Sub message


port markupForFile : FileMarkup -> Cmd message
