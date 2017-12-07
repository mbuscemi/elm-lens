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
        , batchUpdateSent : Bool
    }


transmit : Model model -> ( Model model, Cmd message )
transmit model =
    lifecycleBasedtransmission model
        |> Tuple.mapSecond Cmd.batch


transmitTo : String -> Model model -> ( Model model, Cmd message )
transmitTo filePath model =
    And.execute model (transmitFileMarkup model filePath)


lifecycleBasedtransmission : Model model -> ( Model model, List (Cmd message) )
lifecycleBasedtransmission model =
    if Model.BatchProcess.isComplete model && not model.batchUpdateSent then
        transmitToActiveEditors { model | batchUpdateSent = True }
    else
        transmitToUpdatedEditor model


transmitToUpdatedEditor : Model model -> ( Model model, List (Cmd message) )
transmitToUpdatedEditor model =
    case model.lastUpdatedFile of
        Just fileName ->
            ( model, [ transmitFileMarkup model fileName ] )

        Nothing ->
            ( model, [] )


transmitToActiveEditors : Model model -> ( Model model, List (Cmd message) )
transmitToActiveEditors model =
    ( model, List.map (transmitFileMarkup model) (Set.toList model.activeTextEditors) )


transmitFileMarkup : Model model -> String -> Cmd message
transmitFileMarkup model filePath =
    markupForFile <| Model.FileMarkup.make filePath model


port markupForFile : FileMarkup -> Cmd message
