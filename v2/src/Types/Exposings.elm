module Types.Exposings exposing (Exposings, default)


type alias Exposings =
    { functions : List String
    , types : List String
    }


default : Exposings
default =
    { functions = []
    , types = []
    }
