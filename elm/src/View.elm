module View exposing (render)

import Html exposing (Html, div, text)
import Types.ReferencePanelState exposing (ReferencePanelState)


type alias Data =
    { referencePanelState : ReferencePanelState }


render : Data -> Html message
render data =
    div []
        [ case data.referencePanelState of
            Just referencePanelState ->
                div []
                    [ div [] [ text referencePanelState.fileName ]
                    , div [] [ text referencePanelState.expressionName ]
                    ]

            Nothing ->
                div [] []
        ]
