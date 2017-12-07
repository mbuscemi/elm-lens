module Model.ProjectFileData exposing (add)

import Json.Decode exposing (Decoder, Value, decodeValue, field, list, string, value)
import Types.ProjectFileData exposing (ProjectFileData)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , lastUpdatedFile : Maybe String
        , fileBeingReprocessed : Maybe String
    }


add : Value -> Model model -> Model model
add value model =
    let
        fileName =
            decode value "fileName" string ""
    in
    { model
        | projectFileData = Types.ProjectFileData.insert fileName value model.projectFileData
        , lastUpdatedFile = Just fileName
        , fileBeingReprocessed = markReprocessedFileComplete fileName model
    }


decode : Value -> String -> Decoder a -> a -> a
decode value fieldName decoder default =
    decodeValue (field fieldName decoder) value
        |> Result.withDefault default


markReprocessedFileComplete : String -> Model model -> Maybe String
markReprocessedFileComplete fileName model =
    case model.fileBeingReprocessed of
        Just reprocessingFile ->
            if reprocessingFile == fileName then
                Nothing
            else
                model.fileBeingReprocessed

        Nothing ->
            Nothing
