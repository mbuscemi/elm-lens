module Model.Report exposing (make)

import Json.Encode exposing (Value, list, object, string)
import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | moduleName : List String
        , topLevelExpressions : TopLevelExpressions
        , exposings : Exposings
        , references : List Reference
    }


make : String -> Model model -> Value
make fileName model =
    object
        [ ( "fileName", string fileName )
        , ( "moduleName", list <| List.map string model.moduleName )
        , ( "topLevelExpressions", Types.TopLevelExpressions.encoder model.topLevelExpressions )
        , ( "exposings", Types.Exposings.encoder model.exposings )
        , ( "references", list <| List.map Types.Reference.encoder model.references )
        ]
