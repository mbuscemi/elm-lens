module Model.AllFunctions exposing (record)

import Parser exposing ((|.), (|=), Parser, fail, ignore, keyword, oneOf, oneOrMore, run, succeed, symbol)
import Parsing exposing (lowerInitialSingleString)
import Set exposing (Set)


type alias WithAllFunctions model =
    { model | allFunctions : Set String }


record : String -> WithAllFunctions model -> WithAllFunctions model
record allLines model =
    { model | allFunctions = parseAllFunctions allLines }


parseAllFunctions : String -> Set String
parseAllFunctions allLines =
    List.foldl
        functionCollector
        Set.empty
        (String.split "\n" allLines)


functionCollector : String -> Set String -> Set String
functionCollector line functions =
    case run wordInIntialPosition line of
        Ok (FunctionName function) ->
            Set.insert function functions

        _ ->
            functions


type InitialWord
    = ElmKeyword
    | FunctionName String


wordInIntialPosition : Parser InitialWord
wordInIntialPosition =
    oneOf
        [ succeed ElmKeyword
            |. keyword "port"
        , succeed ElmKeyword
            |. keyword "module"
        , succeed ElmKeyword
            |. keyword "import"
        , succeed ElmKeyword
            |. keyword "type"
        , succeed FunctionName
            |= lowerInitialSingleString
        ]
