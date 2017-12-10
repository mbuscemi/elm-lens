module Types.FileData exposing (FileData, default)

import Types.Exposings exposing (Exposings)
import Types.References exposing (References)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias FileData =
    { moduleName : List String
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : References
    }


default : FileData
default =
    { moduleName = []
    , topLevelExpressions = Types.TopLevelExpressions.default
    , exposings = Types.Exposings.default
    , references = Types.References.default
    }
