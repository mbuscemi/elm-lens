module Model.ExposedFunctions exposing (record)

import Parser exposing ((|.), (|=), Parser, andThen, delayedCommit, ignore, keep, keyword, oneOf, oneOrMore, run, succeed, symbol, zeroOrMore)
import Parsing exposing (isAlphaOrDot, singleString, spaces)


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
        |. keyword "exposing"
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
