module Types.TopLevelExpressions exposing (TopLevelExpressions, default)

import Types.Expression exposing (Expression)


type alias TopLevelExpressions =
    { functions : List Expression
    , types : List Expression
    , typeAliases : List Expression
    }


default : TopLevelExpressions
default =
    { functions = []
    , types = []
    , typeAliases = []
    }
