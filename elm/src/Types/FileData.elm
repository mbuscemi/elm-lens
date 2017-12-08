module Types.FileData exposing (FileData, default)

import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias FileData =
    { moduleName : List String
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : List Reference
    }


default : FileData
default =
    { moduleName = []
    , topLevelExpressions = Types.TopLevelExpressions.default
    , exposings = Types.Exposings.default
    , references = []
    }
