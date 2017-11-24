module Model.FileMarkup exposing (make)

import Dict
import Types.FileData exposing (FileData)
import Types.FileMarkup exposing (ExpressionData, FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)


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
