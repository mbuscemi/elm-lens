port module Main exposing (main)

import And
import Dict exposing (Dict)
import Json.Encode exposing (Value)
import Model.FileMarkup
import Model.ProjectFileData
import Types.FileMarkup exposing (FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)


type alias Model =
    { projectFileData : ProjectFileData
    , projectFileRegistry : List String
    , lastUpdatedFile : String
    }


type Message
    = RegisterProjectFiles (List String)
    | AddFileData Value


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { projectFileData = Dict.empty
    , projectFileRegistry = []
    , lastUpdatedFile = ""
    }
        |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        RegisterProjectFiles files ->
            { model | projectFileRegistry = files }
                |> And.noCommand

        AddFileData value ->
            model
                |> Model.ProjectFileData.add value
                |> andTransmitFileMarkup


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ registerProjectFiles RegisterProjectFiles
        , processReport AddFileData
        ]


andTransmitFileMarkup : Model -> ( Model, Cmd Message )
andTransmitFileMarkup model =
    And.execute (markupForFile <| Model.FileMarkup.make model.lastUpdatedFile model) model


port registerProjectFiles : (List String -> message) -> Sub message


port processReport : (Value -> message) -> Sub message


port markupForFile : FileMarkup -> Cmd message
