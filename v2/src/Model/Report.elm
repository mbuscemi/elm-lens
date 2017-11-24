module Model.Report exposing (make)

import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.Report exposing (Report)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | topLevelExpressions : TopLevelExpressions
        , exposings : Exposings
        , references : List Reference
    }


make : String -> Model model -> Report
make fileName model =
    { fileName = fileName
    , topLevelExpressions = model.topLevelExpressions
    , exposings = model.exposings
    , references = model.references
    }
