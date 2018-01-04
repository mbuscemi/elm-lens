module Model.FileMarkup exposing (make)

import Dict
import Elm.Syntax.Base exposing (ModuleName)
import Model.BatchProcess
import Set exposing (Set)
import Types.Expression exposing (Expression)
import Types.FileData exposing (FileData)
import Types.FileMarkup exposing (ExpressionData, FileMarkup)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.SpecialType


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , projectFileRegistry : Set String
        , fileBeingReprocessed : Maybe String
    }


make : String -> Model model -> FileMarkup
make fileName model =
    Dict.get fileName model.projectFileData
        |> Maybe.withDefault Types.FileData.default
        |> toFileMarkup fileName model


toFileMarkup : String -> Model model -> FileData -> FileMarkup
toFileMarkup fileName model fileData =
    FileMarkup
        fileName
        (Model.BatchProcess.isComplete model)
        (isFileReprocessing fileName model)
        (collectExpressions fileName model.projectFileData fileData)


isFileReprocessing : String -> Model model -> Bool
isFileReprocessing fileName model =
    case model.fileBeingReprocessed of
        Just reprocessingFile ->
            fileName == reprocessingFile

        Nothing ->
            False


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
        (numOccurencesInOtherReferences fileIsExposed fileData.moduleName funcName fileName projectFileData)
        (Types.SpecialType.toString funcData.specialType)
        :: list


isExposed : String -> FileData -> Bool
isExposed expName fileData =
    Set.member expName fileData.exposings.functions || Set.member expName fileData.exposings.types


numOccurencesInOwnReferences : String -> FileData -> Int
numOccurencesInOwnReferences funcName fileData =
    Dict.get funcName fileData.references.internal
        |> Maybe.withDefault []
        |> List.length


numOccurencesInOtherReferences : Bool -> ModuleName -> String -> String -> ProjectFileData -> Int
numOccurencesInOtherReferences fileIsExposed moduleName funcName fileName projectFileData =
    if fileIsExposed then
        Dict.foldl (otherReferenceCounter moduleName funcName fileName) 0 projectFileData
    else
        0


otherReferenceCounter : ModuleName -> String -> String -> String -> FileData -> Int -> Int
otherReferenceCounter moduleName funcName fileName curFileName fileData count =
    if curFileName == fileName then
        count
    else
        Dict.get moduleName fileData.references.external
            |> Maybe.withDefault Dict.empty
            |> Dict.get funcName
            |> Maybe.withDefault []
            |> List.length
            |> (+) count
