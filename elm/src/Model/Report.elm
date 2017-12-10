module Model.Report exposing (make)

import Json.Encode exposing (Value, list, object, string)
import Types.Exposings exposing (Exposings)
import Types.References exposing (References)
import Types.Report exposing (Report)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | moduleName : List String
        , topLevelExpressions : TopLevelExpressions
        , exposings : Exposings
        , references : References
    }


make : String -> Model model -> Value
make fileName model =
    Report
        fileName
        model.moduleName
        model.topLevelExpressions
        model.exposings
        model.references
        |> Types.Report.encoder
