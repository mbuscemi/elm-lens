module Model.AllFunctions exposing (record)

import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser, fail, ignore, keyword, oneOf, oneOrMore, run, succeed, symbol)
import Parsing exposing (lowerInitialSingleString)
import Set exposing (Set)


type alias FileFunctionsMap =
    Dict String (Set String)


type alias FileFunctionLinesMap =
    Dict String (Dict String Int)


type alias WithAllFunctions model =
    { model
        | allFunctions : FileFunctionsMap
        , allFunctionLines : FileFunctionLinesMap
    }


record : String -> String -> WithAllFunctions model -> WithAllFunctions model
record fileName allLines model =
    { model
        | allFunctions = parseAllFunctions fileName allLines model.allFunctions
        , allFunctionLines = parseFunctionLines fileName allLines model.allFunctionLines
    }


parseAllFunctions : String -> String -> FileFunctionsMap -> FileFunctionsMap
parseAllFunctions fileName allLines allFunctions =
    List.foldl functionCollector Set.empty (String.split "\n" allLines)
        |> (\functions -> Dict.insert fileName functions allFunctions)


functionCollector : String -> Set String -> Set String
functionCollector line functions =
    case run wordInIntialPosition line of
        Ok (FunctionName function) ->
            Set.insert function functions

        _ ->
            functions


parseFunctionLines : String -> String -> FileFunctionLinesMap -> FileFunctionLinesMap
parseFunctionLines fileName allLines allFunctionLines =
    List.foldl functionLineCollector ( Dict.empty, -1 ) (String.split "\n" allLines)
        |> Tuple.first
        |> (\functionLines -> Dict.insert fileName functionLines allFunctionLines)


functionLineCollector : String -> ( Dict String Int, Int ) -> ( Dict String Int, Int )
functionLineCollector line ( lineNumberMap, lineNumber ) =
    case run wordInIntialPosition line of
        Ok (FunctionName function) ->
            ( Dict.insert function lineNumber lineNumberMap, lineNumber + 1 )

        _ ->
            ( lineNumberMap, lineNumber + 1 )


type InitialWord
    = ElmKeyword
    | FunctionName String


wordInIntialPosition : Parser InitialWord
wordInIntialPosition =
    oneOf
        [ succeed ElmKeyword
            |. keyword "port "
        , succeed ElmKeyword
            |. keyword "module "
        , succeed ElmKeyword
            |. keyword "import "
        , succeed ElmKeyword
            |. keyword "type "
        , succeed FunctionName
            |= lowerInitialSingleString
        ]
