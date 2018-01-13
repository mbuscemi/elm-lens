module Types.ImportDependencies exposing (ImportDependencies, default, moduleNameForSymbol)

import Dict exposing (Dict)
import Dict.Extra as Dict
import Elm.Syntax.Base exposing (ModuleName)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias ImportDependencies =
    Dict ModuleName TopLevelExpressions


default : ImportDependencies
default =
    Dict.empty


moduleNameForSymbol : String -> ImportDependencies -> Maybe ModuleName
moduleNameForSymbol symbol importDependencies =
    Dict.find (isInModule symbol) importDependencies
        |> Maybe.map Tuple.first


isInModule : String -> ModuleName -> TopLevelExpressions -> Bool
isInModule symbol _ topLevelExpressions =
    Types.TopLevelExpressions.hasSymbol symbol topLevelExpressions
