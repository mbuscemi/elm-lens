module Model.FileMarkup exposing (make)

import Dict
import Set
import Types.FileData exposing (FileData)
import Types.FileMarkup exposing (ExpressionData, FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference exposing (Reference)


make : String -> ProjectFileData -> FileMarkup
make fileName projectFileData =
    Dict.get fileName projectFileData
        |> Maybe.withDefault Types.FileData.empty
        |> toFileMarkup fileName projectFileData


toFileMarkup : String -> ProjectFileData -> FileData -> FileMarkup
toFileMarkup fileName projectFileData fileData =
    FileMarkup fileName (makeExpressions fileName projectFileData fileData)


makeExpressions : String -> ProjectFileData -> FileData -> List ExpressionData
makeExpressions fileName projectFileData fileData =
    Dict.foldl
        (\funcName funcData list ->
            let
                fileIsExposed =
                    isExposed funcName fileData
            in
            ExpressionData
                funcName
                funcData.lineNumber
                fileIsExposed
                (numOccurencesInOwnReferences funcName fileData)
                (if fileIsExposed then
                    numOccurencesInOtherReferences funcName fileName projectFileData
                 else
                    0
                )
                :: list
        )
        []
        fileData.topLevelExpressions.functions


isExposed : String -> FileData -> Bool
isExposed funcName fileData =
    Set.member funcName fileData.exposings.functions


numOccurencesInOwnReferences : String -> FileData -> Int
numOccurencesInOwnReferences funcName fileData =
    List.foldl (referenceCounter funcName) 0 fileData.references


referenceCounter : String -> Reference -> Int -> Int
referenceCounter funcName reference count =
    if reference.name == funcName then
        count + 1
    else
        count


numOccurencesInOtherReferences : String -> String -> ProjectFileData -> Int
numOccurencesInOtherReferences funcName fileName projectFileData =
    Dict.foldl (otherReferenceCounter funcName fileName) 0 projectFileData


otherReferenceCounter : String -> String -> String -> FileData -> Int -> Int
otherReferenceCounter funcName fileName curFileName fileData count =
    if curFileName == fileName then
        count
    else
        count + numOccurencesInOwnReferences funcName fileData
