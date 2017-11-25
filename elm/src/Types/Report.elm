module Types.Report exposing (Report)

import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Report =
    { fileName : String
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : List Reference
    }
