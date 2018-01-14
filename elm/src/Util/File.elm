module Util.File exposing (default)

import Elm.Syntax.Exposing exposing (Exposing(All))
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Module exposing (Module(NormalModule))


default : File
default =
    { moduleDefinition =
        NormalModule
            { moduleName = []
            , exposingList =
                All
                    { start = { row = 0, column = 0 }
                    , end = { row = 0, column = 0 }
                    }
            }
    , imports = []
    , declarations = []
    , comments = []
    }
