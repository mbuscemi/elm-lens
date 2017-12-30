module Model.ReferencePanelState exposing (references)

import Dict
import Types.FileData
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

                _ ->
                    []

        _ ->
            []
