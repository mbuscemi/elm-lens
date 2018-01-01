module View exposing (render)

import Html exposing (Html, div, strong, table, tbody, td, text, th, thead, tr)
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
                (referenceRow data.projectPathRegistry data.projectFileLines)
                (Model.ReferencePanelState.references data)
            )
        ]


referenceRow : Set String -> ProjectFileLines -> Reference -> Html message
referenceRow projectPathRegistry projectFileLines reference =
    tr []
        [ td [] [ text <| truncatedFileName projectPathRegistry reference.sourceFilePath ]
        , td [] [ text <| toString <| reference.range.start.row + 1 ]
        , td []
            (Types.ProjectFileLines.getLine reference.sourceFilePath reference.range.start.row projectFileLines
                |> withEmboldenedReference reference
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


withEmboldenedReference : Reference -> String -> List (Html message)
withEmboldenedReference reference line =
    let
        lineLength =
            String.length line

        startCol =
            reference.range.start.column

        endCol =
            if reference.range.end.column <= startCol then
                lineLength - 1
            else
                reference.range.end.column

        beforeReference =
            String.dropRight (lineLength - startCol) line

        fullReference =
            String.slice startCol endCol line

        afterReference =
            String.dropLeft endCol line
    in
    [ text beforeReference
    , strong [] [ text fullReference ]
    , text afterReference
    ]
