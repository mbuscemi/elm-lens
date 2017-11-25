module Types.Expression exposing (Expression, default, updateLineNumber)


type alias Expression =
    { lineNumber : Int
    }


default : Expression
default =
    { lineNumber = 0 }


updateLineNumber : Int -> Expression -> Expression
updateLineNumber lineNumber expression =
    { expression | lineNumber = lineNumber }
