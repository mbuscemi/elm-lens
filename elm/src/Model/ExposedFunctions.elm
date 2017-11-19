module Model.ExposedFunctions exposing (record)

import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser, andThen, delayedCommit, ignore, keep, keyword, oneOf, oneOrMore, run, succeed, symbol, zeroOrMore)
import Parsing exposing (isAlphaOrDot, singleString, spaces)
import Set exposing (Set)


type alias FileFunctionsMap =
    Dict String (Set String)


type alias WithExposedFunctions model =
    { model | exposedFunctions : FileFunctionsMap }


record : String -> List String -> WithExposedFunctions model -> WithExposedFunctions model
record fileName lines model =
    { model | exposedFunctions = parseExposedFunctions fileName lines model.exposedFunctions }


parseExposedFunctions : String -> List String -> FileFunctionsMap -> FileFunctionsMap
parseExposedFunctions fileName lines exposedFuntions =
    String.join "" lines
        |> run exposedFunctions
        |> Result.withDefault Set.empty
        |> (\functions -> Dict.insert fileName functions exposedFuntions)


exposedFunctions : Parser (Set String)
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


exposedFunctionList : Parser (Set String)
exposedFunctionList =
    andThen (\string -> setBuilder (Set.insert string Set.empty)) singleString


setBuilder : Set String -> Parser (Set String)
setBuilder strings =
    oneOf
        [ nextString
            |> andThen (\string -> setBuilder (Set.insert string strings))
        , succeed strings
        ]


nextString : Parser String
nextString =
    delayedCommit spaces <|
        succeed identity
            |. symbol ","
            |. spaces
            |= singleString
