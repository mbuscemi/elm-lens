module View exposing (render)

import Html exposing (Html, div, span, text)
import Html.Attributes exposing (class, id)
import Types.FileMarkup exposing (ExpressionData, FileMarkup)


type alias Data =
    { files : List FileMarkup
    }


render : Data -> Html message
render data =
    div [] (List.map renderFile data.files)


renderFile : FileMarkup -> Html message
renderFile fileMarkup =
    div [] (List.map (renderElement fileMarkup) fileMarkup.expressions)


renderElement : FileMarkup -> ExpressionData -> Html message
renderElement fileMarkup expressionData =
    div
        [ id expressionData.elementId, class <| elementClasses fileMarkup ]
        [ exposingSpan expressionData.isExposed
        , span [ class "divider" ] [ text "|" ]
        , internalRefSpan expressionData.numInternalRefs
        , externalRefBlock fileMarkup.projectIsProcessed expressionData.isExposed expressionData.numExternalRefs
        ]


elementClasses : FileMarkup -> String
elementClasses fileMarkup =
    if fileMarkup.fileIsReprocessing then
        "elm-lens-marker reprocessing"
    else
        "elm-lens-marker"


exposingSpan : Bool -> Html message
exposingSpan isExposed =
    span
        [ class "syntax--keyword syntax--other" ]
        [ text
            (if isExposed then
                "exposed"
             else
                "local"
            )
        ]


internalRefSpan : Int -> Html message
internalRefSpan numInternalRefs =
    span
        [ class "internal-refs" ]
        [ text <| toString numInternalRefs ++ " internal reference" ++ pluralSuffix numInternalRefs ]


externalRefBlock : Bool -> Bool -> Int -> Html message
externalRefBlock projectIsProcessed isExposed numExternalRefs =
    if isExposed then
        span []
            [ span [ class "divider" ] [ text "|" ]
            , span [ class "external-refs" ] (externalRefNumber projectIsProcessed numExternalRefs)
            ]
    else
        span [] []


externalRefNumber : Bool -> Int -> List (Html message)
externalRefNumber projectIsProcessed numExternalRefs =
    if projectIsProcessed then
        [ text <| toString numExternalRefs ++ " external reference" ++ pluralSuffix numExternalRefs ]
    else
        [ loadingBobble
        , text <| " external reference" ++ pluralSuffix numExternalRefs
        ]


pluralSuffix : Int -> String
pluralSuffix num =
    if num == 1 then
        ""
    else
        "s"


loadingBobble : Html message
loadingBobble =
    span [ class "fa fa-spinner fa-pulse fa-3x fa-fw" ] []
