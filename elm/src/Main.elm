port module Main exposing (main)

import And
import Dict exposing (Dict)
import Json.Encode exposing (Value)
import Model.FileMarkup
import Model.ProjectFileData
import Set exposing (Set)
import Types.FileMarkup exposing (FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)


type alias Model =
    { projectFileData : ProjectFileData
    , projectFileRegistry : Set String
    , activeTextEditors : Set String
    , lastUpdatedFile : String
    }


type Message
    = RegisterProjectFiles (List String)
    | RegisterTextEditor String
    | UnregisterTextEditor String
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
    , projectFileRegistry = Set.empty
    , activeTextEditors = Set.empty
    , lastUpdatedFile = ""
    }
        |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        RegisterProjectFiles filePaths ->
            { model | projectFileRegistry = Set.fromList filePaths }
                |> And.noCommand

        RegisterTextEditor filePath ->
            { model | activeTextEditors = Set.insert filePath model.activeTextEditors }
                |> And.noCommand

        UnregisterTextEditor filePath ->
            { model | activeTextEditors = Set.remove filePath model.activeTextEditors }
                |> And.noCommand

        AddFileData value ->
            model
                |> Model.ProjectFileData.add value
                |> andTransmitFileMarkup


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ registerProjectFiles RegisterProjectFiles
        , registerTextEditor RegisterTextEditor
        , unregisterTextEditor UnregisterTextEditor
        , processReport AddFileData
        ]


andTransmitFileMarkup : Model -> ( Model, Cmd Message )
andTransmitFileMarkup model =
    And.execute (markupForFile <| Model.FileMarkup.make model.lastUpdatedFile model) model


port registerProjectFiles : (List String -> message) -> Sub message


port registerTextEditor : (String -> message) -> Sub message


port unregisterTextEditor : (String -> message) -> Sub message


port processReport : (Value -> message) -> Sub message


port markupForFile : FileMarkup -> Cmd message
