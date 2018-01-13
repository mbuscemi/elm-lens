port module Worker exposing (main)

import And
import ElmFile exposing (ElmFile)
import Json.Decode exposing (Value)
import Model.Report


type alias Model =
    { processedFile : ElmFile }


type Message
    = ProcessFile ( String, String )


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Message )
init =
    { processedFile = ElmFile.default }
        |> And.doNothing


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFile ( fileName, text ) ->
            ElmFile.fromString fileName text
                |> (\elmFile -> { processedFile = elmFile })
                |> andSendReport fileName


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch [ process ProcessFile ]


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    And.execute model (report <| Model.Report.make fileName model.processedFile)


port report : Value -> Cmd message


port process : (( String, String ) -> message) -> Sub message
