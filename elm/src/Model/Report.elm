module Model.Report exposing (make)

import Dict exposing (Dict)
import Set exposing (Set)


type alias FileFunctionsMap =
    Dict String (Set String)


type alias FileFunctionLinesMap =
    Dict String (Dict String Int)


type alias FileReport =
    ( String, List ( String, Int, Bool ) )


type alias Model model =
    { model
        | exposedFunctions : FileFunctionsMap
        , allFunctionLines : FileFunctionLinesMap
    }


make : String -> Model model -> FileReport
make fileName model =
    ( fileName, functionExposingsList fileName model )


functionExposingsList : String -> Model model -> List ( String, Int, Bool )
functionExposingsList fileName model =
    List.map
        (\functionName ->
            ( functionName
            , lineForFunctionName fileName functionName model
            , isExposed fileName functionName model
            )
        )
        (allFunctionsList fileName model)


allFunctionsList : String -> Model model -> List String
allFunctionsList fileName model =
    Dict.get fileName model.allFunctionLines
        |> Maybe.withDefault Dict.empty
        |> Dict.toList
        |> List.map Tuple.first


lineForFunctionName : String -> String -> Model model -> Int
lineForFunctionName fileName functionName model =
    Dict.get fileName model.allFunctionLines
        |> Maybe.withDefault Dict.empty
        |> Dict.get functionName
        |> Maybe.withDefault -1


isExposed : String -> String -> Model model -> Bool
isExposed fileName functionName model =
    Dict.get fileName model.exposedFunctions
        |> Maybe.withDefault Set.empty
        |> Set.member functionName
