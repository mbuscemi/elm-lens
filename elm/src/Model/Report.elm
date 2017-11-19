module Model.Report exposing (make)

import Dict exposing (Dict)
import Set exposing (Set)


type alias FileFunctionsMap =
    Dict String (Set String)


type alias FileFunctionLinesMap =
    Dict String (Dict String Int)


type alias FileReport =
    ( String, List ( String, Int, Bool ) )


type alias Model =
    { exposedFunctions : FileFunctionsMap
    , allFunctions : FileFunctionsMap
    , allFunctionLines : FileFunctionLinesMap
    }


make : String -> Model -> FileReport
make fileName model =
    ( fileName, functionExposingsList fileName model )


functionExposingsList : String -> Model -> List ( String, Int, Bool )
functionExposingsList fileName model =
    List.map
        (\functionName ->
            ( functionName
            , lineForFunctionName fileName functionName model
            , isExposed fileName functionName model
            )
        )
        (allFunctionsList fileName model)


allFunctionsList : String -> Model -> List String
allFunctionsList fileName model =
    Dict.get fileName model.allFunctions
        |> Maybe.withDefault Set.empty
        |> Set.toList


lineForFunctionName : String -> String -> Model -> Int
lineForFunctionName fileName functionName model =
    Dict.get fileName model.allFunctionLines
        |> Maybe.withDefault Dict.empty
        |> Dict.get functionName
        |> Maybe.withDefault -1


isExposed : String -> String -> Model -> Bool
isExposed fileName functionName model =
    Dict.get fileName model.exposedFunctions
        |> Maybe.withDefault Set.empty
        |> Set.member functionName
