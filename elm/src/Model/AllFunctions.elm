module Model.AllFunctions exposing (record)

import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser, fail, ignore, keyword, oneOf, oneOrMore, run, succeed, symbol)
import Parsing exposing (lowerInitialSingleString)
import Set exposing (Set)


type alias WithAllFunctions model =
    { model | allFunctions : Dict String (Set String) }


record : String -> String -> WithAllFunctions model -> WithAllFunctions model
record fileName allLines model =
    { model | allFunctions = Debug.log "all functions" <| parseAllFunctions fileName allLines }


parseAllFunctions : String -> String -> Dict String (Set String)
parseAllFunctions fileName allLines =
    List.foldl functionCollector Set.empty (String.split "\n" allLines)
        |> (\functions -> Dict.insert fileName functions Dict.empty)


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
