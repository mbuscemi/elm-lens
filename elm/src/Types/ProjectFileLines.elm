module Types.ProjectFileLines exposing (ProjectFileLines, default, getLine, mergeIn)

import Dict exposing (Dict)
import Json.Encode exposing (Value)
import Types.FileLineResponse


type alias ProjectFileLines =
    Dict String (Dict Int String)


default : ProjectFileLines
default =
    Dict.empty


mergeIn : Value -> ProjectFileLines -> ProjectFileLines
mergeIn newLines projectFileLines =
    Dict.union (Types.FileLineResponse.decode newLines) projectFileLines


getLine : String -> Int -> ProjectFileLines -> String
getLine fileName lineNumber projectFileLines =
    Dict.get fileName projectFileLines
        |> Maybe.withDefault Dict.empty
        |> Dict.get lineNumber
        |> Maybe.withDefault ""
