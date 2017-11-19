module Model.AllFunctions exposing (record)

import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser, fail, ignore, keyword, oneOf, oneOrMore, run, succeed, symbol)
import Parsing exposing (lowerInitialSingleString)


type alias FileFunctionLinesMap =
    Dict String (Dict String Int)


type alias WithAllFunctions model =
    { model
        | allFunctionLines : FileFunctionLinesMap
    }


record : String -> List String -> WithAllFunctions model -> WithAllFunctions model
record fileName lines model =
    { model
        | allFunctionLines = parseFunctionLines fileName lines model.allFunctionLines
    }


parseFunctionLines : String -> List String -> FileFunctionLinesMap -> FileFunctionLinesMap
parseFunctionLines fileName lines allFunctionLines =
    List.foldl functionLineCollector ( Dict.empty, -1 ) lines
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
