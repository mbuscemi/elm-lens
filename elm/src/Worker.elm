port module Worker exposing (main)

import And
import And.ImportDependencies
import ElmFile exposing (ElmFile)
import Json.Decode exposing (Value)
import Model.FileProcessing
import Model.Report
import WorkerModel exposing (WorkerModel)


type Message
    = ProcessFileFirstPass ( String, String )
    | ProcessImportDependencies (List ( String, String ))
    | ProcessReferencesAndReport


main : Program Never WorkerModel Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( WorkerModel, Cmd Message )
init =
    WorkerModel.default |> And.doNothing


update : Message -> WorkerModel -> ( WorkerModel, Cmd Message )
update message model =
    case message of
        ProcessFileFirstPass ( fileName, text ) ->
            WorkerModel.default
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


subscriptions : WorkerModel -> Sub Message
subscriptions model =
    Sub.batch
        [ process ProcessFileFirstPass
        , processMultiple ProcessImportDependencies
        ]


andSendReport : String -> WorkerModel -> ( WorkerModel, Cmd Message )
andSendReport fileName model =
    Model.Report.make fileName model.processedFile
        |> report
        |> And.execute model


port report : Value -> Cmd message


port process : (( String, String ) -> message) -> Sub message


port processMultiple : (List ( String, String ) -> message) -> Sub message
