port module Worker exposing (main)

import And
import And.ImportDependencies
import Dict exposing (Dict)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)
import Json.Decode exposing (Value)
import Model.FileProcessing
import Model.Report
import Types.ImportDependencies exposing (ImportDependencies)
import Util.File


type alias Model =
    { fileName : String
    , fileAst : File
    , asts : Dict String File
    , processedFile : ElmFile
    , processedDependencies : ImportDependencies
    }


type Message
    = ProcessFileFirstPass ( String, String )
    | ProcessImportDependencies (List ( String, String ))
    | ProcessReferencesAndReport


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
    , processedDependencies = Types.ImportDependencies.default
    }
        |> And.doNothing


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFileFirstPass ( fileName, text ) ->
            model
                |> Model.FileProcessing.setFileName fileName
                |> Model.FileProcessing.setAst (ElmFile.makeAst fileName text)
                |> Model.FileProcessing.firstPass
                |> And.ImportDependencies.process ProcessReferencesAndReport

        ProcessImportDependencies fileData ->
            model
                |> Model.FileProcessing.addDependencies fileData
                |> Model.FileProcessing.processDependencies
                |> And.executeNext ProcessReferencesAndReport

        ProcessReferencesAndReport ->
            model
                |> Model.FileProcessing.processReferences
                |> andSendReport model.fileName


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ process ProcessFileFirstPass
        , processMultiple ProcessImportDependencies
        ]


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    Model.Report.make fileName model.processedFile
        |> report
        |> And.execute model


port report : Value -> Cmd message


port process : (( String, String ) -> message) -> Sub message


port processMultiple : (List ( String, String ) -> message) -> Sub message
