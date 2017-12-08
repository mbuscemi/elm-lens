module Model.ProjectFileData exposing (add)

import Json.Decode exposing (Decoder, Value, decodeValue, field, list, string, value)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Report exposing (Report)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , lastUpdatedFile : Maybe String
        , fileBeingReprocessed : Maybe String
    }


add : Value -> Model model -> Model model
add value model =
    addFromReport (Types.Report.fromValue value) model


addFromReport : Report -> Model model -> Model model
addFromReport report model =
    { model
        | projectFileData = Types.ProjectFileData.insert report model.projectFileData
        , lastUpdatedFile = Just report.fileName
        , fileBeingReprocessed = markReprocessedFileComplete report model
    }


markReprocessedFileComplete : Report -> Model model -> Maybe String
markReprocessedFileComplete report model =
    case model.fileBeingReprocessed of
        Just reprocessingFile ->
            if reprocessingFile == report.fileName then
                Nothing
            else
                model.fileBeingReprocessed

        Nothing ->
            Nothing
