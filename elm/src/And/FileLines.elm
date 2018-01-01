port module And.FileLines exposing (request)

import And
import Dict
import Dict.Extra as Dict
import Json.Encode exposing (Value)
import Model.ReferencePanelState
import Set exposing (Set)
import Types.FileLineRequest exposing (FileLineRequest, encoder)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference exposing (Reference)
import Types.ReferencePanelState exposing (ReferencePanelState)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , referencePanelState : ReferencePanelState
    }


request : Model model -> ( Model model, Cmd message )
request model =
    And.execute model (makeRequest model)


makeRequest : Model model -> Cmd message
makeRequest model =
    fileLineRequest <| buildLineRequest model


buildLineRequest : Model model -> Value
buildLineRequest model =
    Types.FileLineRequest.default
        |> buildLinesFrom model
        |> Types.FileLineRequest.encoder


buildLinesFrom : Model model -> FileLineRequest -> FileLineRequest
buildLinesFrom model fileLineRequest =
    List.foldl
        addLineRequest
        fileLineRequest
        (Model.ReferencePanelState.references model)


addLineRequest : Reference -> FileLineRequest -> FileLineRequest
addLineRequest reference fileLineRequest =
    Dict.insertDedupe insertReferenceLine reference.sourceFilePath (Set.fromList [ reference.range.start.row ]) fileLineRequest


insertReferenceLine : Set Int -> Set Int -> Set Int
insertReferenceLine original new =
    Set.union original new


port fileLineRequest : Value -> Cmd message
