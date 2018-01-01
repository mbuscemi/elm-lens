module View exposing (render)

import Html exposing (Html, div, table, tbody, td, text, th, thead, tr)
import Model.ReferencePanelState
import Set exposing (Set)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.ProjectFileLines exposing (ProjectFileLines)
import Types.Reference exposing (Reference)
import Types.ReferencePanelState exposing (ReferencePanelState)


type alias Data =
    { referencePanelState : ReferencePanelState
    , projectFileData : ProjectFileData
    , projectPathRegistry : Set String
    , projectFileLines : ProjectFileLines
    }


render : Data -> Html message
render data =
    table []
        [ thead []
            [ tr []
                [ th [] [ text "File" ]
                , th [] [ text "Line #" ]
                , th [] [ text "Code" ]
                ]
            ]
        , tbody []
            (List.map
                (Types.ReferencePanelState.fileName data.referencePanelState
                    |> referenceRow data.projectPathRegistry data.projectFileLines
                )
                (Model.ReferencePanelState.references data)
            )
        ]


referenceRow : Set String -> ProjectFileLines -> String -> Reference -> Html message
referenceRow projectPathRegistry projectFileLines fileName reference =
    tr []
        [ td [] [ text <| truncatedFileName projectPathRegistry fileName ]
        , td [] [ text <| toString reference.range.start.row ]
        , td [] [ text <| Types.ProjectFileLines.getLine fileName reference.range.start.row projectFileLines ]
        ]


truncatedFileName : Set String -> String -> String
truncatedFileName projectPathRegistry fileName =
    Set.foldl stripProjectPath fileName projectPathRegistry


stripProjectPath : String -> String -> String
stripProjectPath projectPath fileName =
    if String.contains projectPath fileName then
        String.dropLeft (String.length projectPath) fileName
    else
        fileName
