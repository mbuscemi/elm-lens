port module Worker exposing (main)

import And
import Dict exposing (Dict)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)
import Json.Decode exposing (Value)
import Model.FileProcessing
import Model.Report
import Util.File


type alias Model =
    { fileName : String
    , fileAst : File
    , asts : Dict String File
    , processedFile : ElmFile
    }


type Message
    = ProcessFileStageOne ( String, String )
    | ProcessFileStageTwo


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { fileName = ""
    , fileAst = Util.File.default
    , asts = Dict.empty
    , processedFile = ElmFile.default
    }
        |> And.doNothing


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFileStageOne ( fileName, text ) ->
            model
                |> Model.FileProcessing.setFileName fileName
                |> Model.FileProcessing.setAst (ElmFile.makeAst fileName text)
                |> Model.FileProcessing.firstPass
                |> And.executeNext ProcessFileStageTwo

        ProcessFileStageTwo ->
            model
                |> Model.FileProcessing.processReferences
                |> andSendReport model.fileName


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch [ process ProcessFileStageOne ]


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    Model.Report.make fileName model.processedFile
        |> report
        |> And.execute model


port report : Value -> Cmd message


port process : (( String, String ) -> message) -> Sub message
