module Model.FileMarkup exposing (make)

import Dict
import Set
import Types.Expression exposing (Expression)
import Types.FileData exposing (FileData)
import Types.FileMarkup exposing (ExpressionData, FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference exposing (Reference)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
    }


make : String -> Model model -> FileMarkup
make fileName model =
    Dict.get fileName model.projectFileData
        |> Maybe.withDefault Types.FileData.empty
        |> toFileMarkup fileName model.projectFileData


toFileMarkup : String -> ProjectFileData -> FileData -> FileMarkup
toFileMarkup fileName projectFileData fileData =
    FileMarkup fileName (collectExpressions fileName projectFileData fileData)


collectExpressions : String -> ProjectFileData -> FileData -> List ExpressionData
collectExpressions fileName projectFileData fileData =
    let
        expressionBuilder =
            makeExpression fileName projectFileData fileData
    in
    Dict.foldl expressionBuilder [] fileData.topLevelExpressions.functions
        |> (\expressionData -> Dict.foldl expressionBuilder expressionData fileData.topLevelExpressions.types)
        |> (\expressionData -> Dict.foldl expressionBuilder expressionData fileData.topLevelExpressions.typeAliases)


makeExpression : String -> ProjectFileData -> FileData -> String -> Expression -> List ExpressionData -> List ExpressionData
makeExpression fileName projectFileData fileData funcName funcData list =
    let
        fileIsExposed =
            isExposed funcName fileData
    in
    ExpressionData
        funcName
        funcData.lineNumber
        fileIsExposed
        (numOccurencesInOwnReferences funcName fileData)
        (numOccurencesInOtherReferences fileIsExposed funcName fileName projectFileData)
        :: list


isExposed : String -> FileData -> Bool
isExposed expName fileData =
    Set.member expName fileData.exposings.functions || Set.member expName fileData.exposings.types


numOccurencesInOwnReferences : String -> FileData -> Int
numOccurencesInOwnReferences funcName fileData =
    List.foldl (referenceCounter funcName) 0 fileData.references


referenceCounter : String -> Reference -> Int -> Int
referenceCounter funcName reference count =
    if reference.name == funcName then
        count + 1
    else
        count


numOccurencesInOtherReferences : Bool -> String -> String -> ProjectFileData -> Int
numOccurencesInOtherReferences fileIsExposed funcName fileName projectFileData =
    if fileIsExposed then
        Dict.foldl (otherReferenceCounter funcName fileName) 0 projectFileData
    else
        0


otherReferenceCounter : String -> String -> String -> FileData -> Int -> Int
otherReferenceCounter funcName fileName curFileName fileData count =
    if curFileName == fileName then
        count
    else
        count + numOccurencesInOwnReferences funcName fileData
