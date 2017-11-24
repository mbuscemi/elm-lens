module Types.TopLevelExpressions exposing (TopLevelExpressions, default)


type alias TopLevelExpressions =
    { functions : List String
    , types : List String
    , typeAliases : List String
    }


default : TopLevelExpressions
default =
    { functions = []
    , types = []
    , typeAliases = []
    }
