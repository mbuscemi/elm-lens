module Model.FileMarkup exposing (make)

import Dict
import Set
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
            ExpressionData
                funcName
                funcData.lineNumber
                (isExposed funcName fileData)
                (numOccurencesInOwnReferences funcName fileData)
                :: list
        )
        []
        fileData.topLevelExpressions.functions


isExposed : String -> FileData -> Bool
isExposed funcName fileData =
    Set.member funcName fileData.exposings.functions


numOccurencesInOwnReferences : String -> FileData -> Int
numOccurencesInOwnReferences funcName fileData =
    List.foldl
        (\ref count ->
            if ref.name == funcName then
                count + 1
            else
                count
        )
        0
        fileData.references
