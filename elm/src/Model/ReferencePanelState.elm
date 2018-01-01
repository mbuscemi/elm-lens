module Model.ReferencePanelState exposing (references)

import Dict
import Elm.Syntax.Base exposing (ModuleName)
import Types.FileData exposing (FileData)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference exposing (Reference)
import Types.ReferencePanelState exposing (ReferencePanelState)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , referencePanelState : ReferencePanelState
    }


references : Model model -> List Reference
references model =
    case model.referencePanelState of
        Just data ->
            case data.type_ of
                Types.ReferencePanelState.Internal ->
                    Dict.get data.fileName model.projectFileData
                        |> Maybe.withDefault Types.FileData.default
                        |> .references
                        |> .internal
                        |> List.filter (\ref -> ref.name == data.expressionName)
                        |> List.sortWith referenceSorter

                Types.ReferencePanelState.External ->
                    collectExternalReferences
                        data.expressionName
                        data.fileName
                        (Types.ProjectFileData.moduleName data.fileName model.projectFileData)
                        model.projectFileData
                        |> List.sortWith referenceSorter

        _ ->
            []


collectExternalReferences : String -> String -> ModuleName -> ProjectFileData -> List Reference
collectExternalReferences expName fileName moduleName projectFileData =
    Dict.foldl (externalRefsFor expName moduleName) [] projectFileData


externalRefsFor : String -> ModuleName -> String -> FileData -> List Reference -> List Reference
externalRefsFor expName moduleName fileName fileData references =
    Dict.get moduleName fileData.references.external
        |> Maybe.withDefault []
        |> List.filter (\ref -> ref.name == expName)
        |> List.append references


referenceSorter : Reference -> Reference -> Order
referenceSorter ref1 ref2 =
    case
        ( ref1.sourceFilePath < ref2.sourceFilePath
        , ref1.sourceFilePath > ref2.sourceFilePath
        , ref1.sourceFilePath == ref2.sourceFilePath
        , ref1.range.start.row < ref2.range.start.row
        )
    of
        ( True, _, _, _ ) ->
            LT

        ( False, True, _, _ ) ->
            GT

        ( False, False, True, True ) ->
            LT

        ( False, False, True, False ) ->
            GT

        ( False, False, False, _ ) ->
            EQ
