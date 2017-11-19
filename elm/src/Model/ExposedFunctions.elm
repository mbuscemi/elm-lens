module Model.ExposedFunctions exposing (record)

import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser, andThen, delayedCommit, ignore, keep, keyword, oneOf, oneOrMore, run, succeed, symbol, zeroOrMore)
import Parsing exposing (isAlphaOrDot, singleString, spaces)
import Set exposing (Set)


type alias WithExposedFunctions model =
    { model | exposedFunctions : Dict String (Set String) }


record : String -> String -> WithExposedFunctions model -> WithExposedFunctions model
record fileName firstLine model =
    { model | exposedFunctions = Debug.log "exposed functions" <| parseExposedFunctions fileName firstLine }


parseExposedFunctions : String -> String -> Dict String (Set String)
parseExposedFunctions fileName firstLine =
    run exposedFunctions firstLine
        |> Result.withDefault Set.empty
        |> (\functions -> Dict.insert fileName functions Dict.empty)


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
    andThen (\string -> setBuilder (Set.insert string Set.empty)) <| singleString


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
