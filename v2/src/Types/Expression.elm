module Types.Expression exposing (Expression, from)


type alias Expression =
    { name : String
    , lineNumber : Int
    }


from : String -> Expression
from name =
    { name = name
    , lineNumber = 0
    }
