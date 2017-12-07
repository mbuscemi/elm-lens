module Types.ProjectFileData exposing (ProjectFileData, insert)

import Dict exposing (Dict)
import Json.Decode exposing (Value, decodeValue)
import Types.FileData exposing (FileData)


type alias ProjectFileData =
    Dict String FileData


insert : String -> Value -> ProjectFileData -> ProjectFileData
insert fileName newEntry projectFileData =
    Dict.insert
        fileName
        (decodeValue Types.FileData.decoder newEntry |> Result.withDefault Types.FileData.empty)
        projectFileData
