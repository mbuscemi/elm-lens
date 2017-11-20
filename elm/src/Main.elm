port module Main exposing (main)

import And
import Ast.Statement exposing (Statement)
import Dict exposing (Dict)
import FunctionMetaData exposing (FunctionMetaData)
import Json.Decode
import Model.AST
import Model.AllFunctions
import Model.ExposedFunctions
import Model.InternalReferences
import Model.Report
import ReferenceMetaData exposing (ReferenceMetaData)
import Set exposing (Set)
import Text


type alias Model =
    { fileASTs : Dict String (List Statement)
    , exposedFunctions : Dict String (Set String)
    , allFunctionMetaData : Dict String (Dict String FunctionMetaData)
    , lowerCaseRefsByFile : Dict String (Dict String ReferenceMetaData)
    }


type Message
    = ProcessLines ( String, String )


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { fileASTs = Dict.empty
    , exposedFunctions = Dict.empty
    , allFunctionMetaData = Dict.empty
    , lowerCaseRefsByFile = Dict.empty
    }
        |> And.noCommand


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessLines ( fileName, text ) ->
            let
                lines =
                    Text.preprocess text
            in
            model
                |> Model.AST.parseFile fileName text
                |> Model.ExposedFunctions.record fileName lines
                |> Model.AllFunctions.record fileName lines
                |> Model.InternalReferences.record fileName text
                |> andSendReport fileName


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    And.execute (report <| Model.Report.make fileName model) model


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ process ProcessLines
        ]


port report : ( String, List ( String, Int, Bool ) ) -> Cmd message


port process : (( String, String ) -> message) -> Sub message
