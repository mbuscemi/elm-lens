module View exposing (render)

import Dict
import Html exposing (Html, div, table, tbody, td, text, th, thead, tr)
import Set exposing (Set)
import Types.FileData
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
    div []
        [ case data.referencePanelState of
            Just referencePanelState ->
                div []
                    [ referenceTable referencePanelState data.projectFileData data.projectPathRegistry
                    ]

            Nothing ->
                div [] []
        ]


referenceTable : Types.ReferencePanelState.Data -> ProjectFileData -> Set String -> Html message
referenceTable referencePanelData projectFileData projectPathRegistry =
    table []
        [ thead []
            [ tr []
                [ th [] [ text "File" ]
                , th [] [ text "Line #" ]
                , th [] [ text "Code" ]
                ]
            ]
        , tbody []
            (case referencePanelData.type_ of
                Types.ReferencePanelState.Internal ->
                    Dict.get referencePanelData.fileName projectFileData
                        |> Maybe.withDefault Types.FileData.default
                        |> .references
                        |> .internal
                        |> List.filter (\ref -> ref.name == referencePanelData.expressionName)
                        |> List.map (referenceRow <| truncatedFileName referencePanelData.fileName projectPathRegistry)

                _ ->
                    [ tr [] [] ]
            )
        ]


truncatedFileName : String -> Set String -> String
truncatedFileName fileName projectPathRegistry =
    Set.foldl
        (\projectPath fileName ->
            if String.contains projectPath fileName then
                String.dropLeft (String.length projectPath) fileName
            else
                fileName
        )
        fileName
        projectPathRegistry


referenceRow : String -> Reference -> Html message
referenceRow fileName reference =
    tr []
        [ td [] [ text fileName ]
        , td [] [ text <| toString reference.range.start.row ]
        , td [] [ text "" ]
        ]
