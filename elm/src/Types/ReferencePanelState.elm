module Types.ReferencePanelState exposing (ReferencePanelState, make, type_)


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


toType : Bool -> Type
toType isExternal =
    if isExternal then
        External
    else
        Internal


type_ : Data -> String
type_ data =
    case data.type_ of
        Internal ->
            "internal"

        External ->
            "external"
