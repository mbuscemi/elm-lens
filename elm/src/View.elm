module View exposing (render)

import Html exposing (Html, div, text)
import Types.ProjectFileData exposing (ProjectFileData)
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
                    [ div [] [ text referencePanelState.fileName ]
                    , div [] [ text referencePanelState.expressionName ]
                    , div [] [ text <| Types.ReferencePanelState.type_ referencePanelState ]
                    ]

            Nothing ->
                div [] []
        ]
