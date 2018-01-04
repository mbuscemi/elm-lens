port module Main exposing (main)

import And
import And.File
import And.FileLines
import And.FileMarkup
import Html exposing (Html)
import Json.Encode exposing (Value)
import Model.ProjectFileData
import Set exposing (Set)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.ProjectFileLines exposing (ProjectFileLines)
import Types.ReferencePanelState exposing (ReferencePanelState)
import View


type alias Model =
    { projectFileData : ProjectFileData
    , projectFileRegistry : Set String
    , projectPathRegistry : Set String
    , projectFileLines : ProjectFileLines
    , activeTextEditors : Set String
    , lastUpdatedFile : Maybe String
    , fileBeingReprocessed : Maybe String
    , batchUpdateSent : Bool
    , referencePanelState : ReferencePanelState
    }


type Message
    = RegisterProjectFiles (List String)
    | RegisterProjectPaths (List String)
    | RegisterTextEditor String
    | UnregisterTextEditor String
    | AddFileData Value
    | MarkAsReprocessing String
    | SetReferencePanel ( String, String, Bool )
    | FileLinesReport Value
    | RequestOpenFileAtLine String Int Int


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
    { projectFileData = Types.ProjectFileData.default
    , projectFileRegistry = Set.empty
    , projectPathRegistry = Set.empty
    , projectFileLines = Types.ProjectFileLines.default
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

        RegisterProjectPaths projectPaths ->
            { model | projectPathRegistry = Set.fromList projectPaths }
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

        SetReferencePanel ( fileName, expressionName, isExternal ) ->
            { model | referencePanelState = Types.ReferencePanelState.make fileName expressionName isExternal }
                |> And.FileLines.request

        FileLinesReport value ->
            { model | projectFileLines = Types.ProjectFileLines.mergeIn value model.projectFileLines }
                |> And.doNothing

        RequestOpenFileAtLine filePath row column ->
            model
                |> And.File.requestOpen filePath row column


view : Model -> Html Message
view model =
    View.render
        { referencePanelState = model.referencePanelState
        , projectFileData = model.projectFileData
        , projectPathRegistry = model.projectPathRegistry
        , projectFileLines = model.projectFileLines
        }
        { requestOpenFileAtLine = RequestOpenFileAtLine }


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ registerProjectFiles RegisterProjectFiles
        , registerProjectPaths RegisterProjectPaths
        , registerTextEditor RegisterTextEditor
        , unregisterTextEditor UnregisterTextEditor
        , processReport AddFileData
        , notifyReprocessingFile MarkAsReprocessing
        , setReferencePanel SetReferencePanel
        , reportFileLines FileLinesReport
        ]


port notifyReprocessingFile : (String -> message) -> Sub message


port registerProjectFiles : (List String -> message) -> Sub message


port registerProjectPaths : (List String -> message) -> Sub message


port registerTextEditor : (String -> message) -> Sub message


port unregisterTextEditor : (String -> message) -> Sub message


port processReport : (Value -> message) -> Sub message


port setReferencePanel : (( String, String, Bool ) -> message) -> Sub message


port reportFileLines : (Value -> message) -> Sub message
