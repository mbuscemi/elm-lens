port module Main exposing (main)

import And
import And.FileMarkup
import Dict exposing (Dict)
import Html exposing (Html)
import Json.Encode exposing (Value)
import Model.ProjectFileData
import Set exposing (Set)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.ReferencePanelState exposing (ReferencePanelState)
import View


type alias Model =
    { projectFileData : ProjectFileData
    , projectFileRegistry : Set String
    , activeTextEditors : Set String
    , lastUpdatedFile : Maybe String
    , fileBeingReprocessed : Maybe String
    , batchUpdateSent : Bool
    , referencePanelState : ReferencePanelState
    }


type Message
    = RegisterProjectFiles (List String)
    | RegisterTextEditor String
    | UnregisterTextEditor String
    | AddFileData Value
    | MarkAsReprocessing String
    | SetReferencePanel ( String, String )


main : Program Never Model Message
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { projectFileData = Dict.empty
    , projectFileRegistry = Set.empty
    , activeTextEditors = Set.empty
    , lastUpdatedFile = Nothing
    , fileBeingReprocessed = Nothing
    , batchUpdateSent = False
    , referencePanelState = Nothing
    }
        |> And.doNothing


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        RegisterProjectFiles filePaths ->
            { model | projectFileRegistry = Set.fromList filePaths }
                |> And.doNothing

        RegisterTextEditor filePath ->
            { model | activeTextEditors = Set.insert filePath model.activeTextEditors }
                |> And.doNothing

        UnregisterTextEditor filePath ->
            { model | activeTextEditors = Set.remove filePath model.activeTextEditors }
                |> And.doNothing

        AddFileData value ->
            model
                |> Model.ProjectFileData.add value
                |> And.FileMarkup.transmit

        MarkAsReprocessing filePath ->
            { model | fileBeingReprocessed = Just filePath }
                |> And.FileMarkup.transmitTo filePath

        SetReferencePanel ( fileName, expressionName ) ->
            { model | referencePanelState = Types.ReferencePanelState.make fileName expressionName }
                |> And.doNothing


view : Model -> Html Message
view model =
    View.render
        { referencePanelState = model.referencePanelState }


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ registerProjectFiles RegisterProjectFiles
        , registerTextEditor RegisterTextEditor
        , unregisterTextEditor UnregisterTextEditor
        , processReport AddFileData
        , notifyReprocessingFile MarkAsReprocessing
        , setReferencePanel SetReferencePanel
        ]


port notifyReprocessingFile : (String -> message) -> Sub message


port registerProjectFiles : (List String -> message) -> Sub message


port registerTextEditor : (String -> message) -> Sub message


port unregisterTextEditor : (String -> message) -> Sub message


port processReport : (Value -> message) -> Sub message


port setReferencePanel : (( String, String ) -> message) -> Sub message
