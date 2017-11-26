module Model.ProjectFileData exposing (add)

import Dict
import Json.Decode exposing (Decoder, Value, decodeValue, field, string, value)
import Types.Exposings
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference
import Types.TopLevelExpressions


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
        | projectFileData =
            Dict.insert
                fileName
                { topLevelExpressions = decode value "topLevelExpressions" Types.TopLevelExpressions.decoder Types.TopLevelExpressions.default
                , exposings = decode value "exposings" Types.Exposings.decoder Types.Exposings.default
                , references = decode value "references" Types.Reference.listDecoder [ Types.Reference.default ]
                }
                model.projectFileData
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
