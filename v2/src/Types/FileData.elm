module Types.FileData exposing (FileData, empty)

import Dict
import Set
import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias FileData =
    { topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : List Reference
    }


empty : FileData
empty =
    { topLevelExpressions =
        { functions = Dict.empty
        , types = Dict.empty
        , typeAliases = Dict.empty
        }
    , exposings =
        { functions = Set.empty
        , types = Set.empty
        }
    , references = []
    }
