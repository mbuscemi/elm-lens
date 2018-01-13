module Types.ImportDependencies exposing (ImportDependencies, default)

import Dict exposing (Dict)
import Elm.Syntax.Base exposing (ModuleName)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias ImportDependencies =
    Dict ModuleName TopLevelExpressions


default : ImportDependencies
default =
    Dict.empty
