module Types.ReferencePanelState exposing (ReferencePanelState, make)


type alias ReferencePanelState =
    Maybe Data


type alias Data =
    { fileName : String
    , expressionName : String
    }


make : String -> String -> ReferencePanelState
make fileName expressionName =
    Just <| Data fileName expressionName
