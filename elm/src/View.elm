module View exposing (render)

import Html exposing (Html, div, table, tbody, td, text, th, thead, tr)
import Model.ReferencePanelState
import Set exposing (Set)
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference exposing (Reference)
import Types.ReferencePanelState exposing (ReferencePanelState)


type alias Data =
    { referencePanelState : ReferencePanelState
    , projectFileData : ProjectFileData
    , projectPathRegistry : Set String
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
                    |> truncatedFileName data.projectPathRegistry
                    |> referenceRow
                )
                (Model.ReferencePanelState.references data)
            )
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


referenceRow : String -> Reference -> Html message
referenceRow fileName reference =
    tr []
        [ td [] [ text fileName ]
        , td [] [ text <| toString reference.range.start.row ]
        , td [] [ text "" ]
        ]
