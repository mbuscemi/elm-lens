port module And.FileMarkup exposing (transmit, transmitTo)

import And
import Model.BatchProcess
import Model.FileMarkup
import Set exposing (Set)
import Types.FileMarkup exposing (FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , projectFileRegistry : Set String
        , activeTextEditors : Set String
        , lastUpdatedFile : Maybe String
        , fileBeingReprocessed : Maybe String
    }


transmit : Model model -> ( Model model, Cmd message )
transmit model =
    And.execute (Cmd.batch <| lifecycleBasedtransmission model) model


transmitTo : String -> Model model -> ( Model model, Cmd message )
transmitTo filePath model =
    And.execute (transmitFileMarkup model filePath) model


lifecycleBasedtransmission : Model model -> List (Cmd message)
lifecycleBasedtransmission model =
    if Model.BatchProcess.isComplete model then
        transmitToActiveEditors model
    else
        transmitToUpdatedEditor model


transmitToUpdatedEditor : Model model -> List (Cmd message)
transmitToUpdatedEditor model =
    case model.lastUpdatedFile of
        Just fileName ->
            [ transmitFileMarkup model fileName ]

        Nothing ->
            []


transmitToActiveEditors : Model model -> List (Cmd message)
transmitToActiveEditors model =
    List.map (transmitFileMarkup model) (Set.toList model.activeTextEditors)


transmitFileMarkup : Model model -> String -> Cmd message
transmitFileMarkup model filePath =
    markupForFile <| Model.FileMarkup.make filePath model


port markupForFile : FileMarkup -> Cmd message
