module Model.ExposedFunctions exposing (record)

import Char
import Parser exposing ((|.), (|=), Parser, andThen, delayedCommit, ignore, keep, keyword, oneOf, oneOrMore, run, succeed, symbol, zeroOrMore)


type alias WithExposedFunctions model =
    { model | exposedFunctions : List String }


record : String -> WithExposedFunctions model -> WithExposedFunctions model
record firstLine model =
    { model | exposedFunctions = parseExposedFunctions firstLine }


parseExposedFunctions : String -> List String
parseExposedFunctions firstLine =
    run exposedFunctions firstLine
        |> Result.withDefault []


exposedFunctions : Parser (List String)
exposedFunctions =
    succeed identity
        |. moduleDeclaration
        |. spaces
        |. moduleName
        |. spaces
        |. exposingDeclaration
        |. spaces
        |. symbol "("
        |. spaces
        |= exposedFunctionList
        |. spaces
        |. symbol ")"


moduleDeclaration : Parser ()
moduleDeclaration =
    oneOf
        [ keyword "port module"
        , keyword "module"
        ]


moduleName : Parser ()
moduleName =
    ignore oneOrMore isAlphaOrDot


exposingDeclaration : Parser ()
exposingDeclaration =
    keyword "exposing"


exposedFunctionList : Parser (List String)
exposedFunctionList =
    andThen (\string -> listBuilder [ string ]) <| singleString


listBuilder : List String -> Parser (List String)
listBuilder strings =
    oneOf
        [ nextString
            |> andThen (\string -> listBuilder (string :: strings))
        , succeed (List.reverse strings)
        ]


nextString : Parser String
nextString =
    delayedCommit spaces <|
        succeed identity
            |. symbol ","
            |. spaces
            |= singleString


singleString : Parser String
singleString =
    keep oneOrMore isAlpha


isAlphaOrDot : Char -> Bool
isAlphaOrDot char =
    isAlpha char || isDot char


isAlpha : Char -> Bool
isAlpha char =
    Char.isUpper char || Char.isLower char


isDot : Char -> Bool
isDot char =
    char == '.'


spaces : Parser String
spaces =
    keep zeroOrMore (\c -> c == ' ')
