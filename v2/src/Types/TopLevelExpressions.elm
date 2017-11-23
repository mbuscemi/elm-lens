module Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias TopLevelExpressions =
    { functions : List String
    , types : List String
    , typeAliases : List String
    }
