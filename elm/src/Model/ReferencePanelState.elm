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

                Types.ReferencePanelState.External ->
                    collectExternalReferences
                        data.expressionName
                        data.fileName
                        (Types.ProjectFileData.moduleName data.fileName model.projectFileData)
                        model.projectFileData

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
