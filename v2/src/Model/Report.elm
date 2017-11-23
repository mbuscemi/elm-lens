module Model.Report exposing (make)

import Types.Report exposing (Report)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | topLevelExpressions : TopLevelExpressions
    }


make : String -> Model model -> Report
make fileName model =
    { fileName = fileName
    , topLevelExpressions = model.topLevelExpressions
    }
