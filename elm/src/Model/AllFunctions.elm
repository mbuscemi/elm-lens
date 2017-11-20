module Model.AllFunctions exposing (record)

import Dict exposing (Dict)
import FunctionMetaData exposing (FunctionMetaData)
import Parser exposing ((|.), (|=), Parser, fail, ignore, keyword, oneOf, oneOrMore, run, succeed, symbol)
import Parsing exposing (takeLowerInitialSingleString)


type alias MetaMap =
    Dict String FunctionMetaData


type alias FileFunctionMetaMap =
    Dict String MetaMap


type alias WithAllFunctions model =
    { model
        | allFunctionMetaData : FileFunctionMetaMap
    }


record : String -> List String -> WithAllFunctions model -> WithAllFunctions model
record fileName lines model =
    { model
        | allFunctionMetaData = parseFunctionLines fileName lines model.allFunctionMetaData
    }


parseFunctionLines : String -> List String -> FileFunctionMetaMap -> FileFunctionMetaMap
parseFunctionLines fileName lines allFunctionLines =
    List.foldl functionLineCollector ( Dict.empty, -1 ) lines
        |> Tuple.first
        |> (\functionLines -> Dict.insert fileName functionLines allFunctionLines)


functionLineCollector : String -> ( MetaMap, Int ) -> ( MetaMap, Int )
functionLineCollector line ( metaMap, lineNumber ) =
    case run wordInIntialPosition line of
        Ok (FunctionName function) ->
            Dict.get function metaMap
                |> Maybe.withDefault FunctionMetaData.default
                |> setLineNumberAndIncrement function lineNumber metaMap

        _ ->
            ( metaMap, lineNumber + 1 )


setLineNumberAndIncrement : String -> Int -> MetaMap -> FunctionMetaData -> ( MetaMap, Int )
setLineNumberAndIncrement function lineNumber metaMap functionMetaData =
    ( Dict.insert function (FunctionMetaData.setLineNumber lineNumber functionMetaData) metaMap, lineNumber + 1 )


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
            |= takeLowerInitialSingleString
        ]
