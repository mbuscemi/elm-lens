module Model.ProjectFileData exposing (add, make)

import Dict
import Json.Decode exposing (Decoder, Value, decodeValue, field, string, value)
import Types.Exposings
import Types.FileData exposing (FileData)
import Types.FileMarkup exposing (ExpressionData, FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference
import Types.TopLevelExpressions


add : Value -> ProjectFileData -> ProjectFileData
add value model =
    Dict.insert
        (decode value "fileName" string "")
        { topLevelExpressions = decode value "topLevelExpressions" Types.TopLevelExpressions.decoder Types.TopLevelExpressions.default
        , exposings = decode value "exposings" Types.Exposings.decoder Types.Exposings.default
        , references = decode value "references" Types.Reference.listDecoder [ Types.Reference.default ]
        }
        model


decode : Value -> String -> Decoder a -> a -> a
decode value fieldName decoder default =
    decodeValue (field fieldName decoder) value
        |> Result.withDefault default


make : String -> ProjectFileData -> FileMarkup
make fileName projectFileData =
    Dict.get fileName projectFileData
        |> Maybe.withDefault Types.FileData.empty
        |> toFileMarkup fileName


toFileMarkup : String -> FileData -> FileMarkup
toFileMarkup fileName fileData =
    FileMarkup fileName (makeExpressions fileData)


makeExpressions : FileData -> List ExpressionData
makeExpressions fileData =
    Dict.foldl
        (\funcName funcData list ->
            ExpressionData funcName funcData.lineNumber False 0 :: list
        )
        []
        fileData.topLevelExpressions.functions
