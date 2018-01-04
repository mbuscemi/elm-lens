module Types.ReferencePanelState exposing (ReferencePanelState, Type(External, Internal), fileName, make)


type alias ReferencePanelState =
    Maybe Data


type Type
    = Internal
    | External


type alias Data =
    { fileName : String
    , expressionName : String
    , type_ : Type
    }


make : String -> String -> Bool -> ReferencePanelState
make fileName expressionName isExternal =
    Just <| Data fileName expressionName (toType isExternal)


fileName : ReferencePanelState -> String
fileName referencePanelState =
    case referencePanelState of
        Just data ->
            data.fileName

        Nothing ->
            ""


toType : Bool -> Type
toType isExternal =
    if isExternal then
        External
    else
        Internal
