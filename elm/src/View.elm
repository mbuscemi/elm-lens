module View exposing (render)

import Dict
import Html exposing (Html, div, table, tbody, td, text, th, thead, tr)
import Types.FileData
import Types.ProjectFileData exposing (ProjectFileData)
import Types.Reference exposing (Reference)
import Types.ReferencePanelState exposing (ReferencePanelState)


type alias Data =
    { referencePanelState : ReferencePanelState
    , projectFileData : ProjectFileData
    }


render : Data -> Html message
render data =
    div []
        [ case data.referencePanelState of
            Just referencePanelState ->
                div []
                    [ referenceTable referencePanelState data.projectFileData
                    ]

            Nothing ->
                div [] []
        ]


referenceTable : Types.ReferencePanelState.Data -> ProjectFileData -> Html message
referenceTable referencePanelData projectFileData =
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
                        |> List.map (referenceRow referencePanelData.fileName)

                _ ->
                    [ tr [] [] ]
            )
        ]


referenceRow : String -> Reference -> Html message
referenceRow fileName reference =
    tr []
        [ td [] [ text fileName ]
        , td [] [ text <| toString reference.range.start.row ]
        , td [] [ text "" ]
        ]
