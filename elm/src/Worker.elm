port module Worker exposing (main)

import And
import Dict exposing (Dict)
import Elm.Syntax.File exposing (File)
import ElmFile exposing (ElmFile)
import Json.Decode exposing (Value)
import Model.Report


type alias Model =
    { asts : Dict String File
    , processedFile : ElmFile
    }


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
    { asts = Dict.empty
    , processedFile = ElmFile.default
    }
        |> And.doNothing


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFile ( fileName, text ) ->
            let
                fileAst =
                    ElmFile.makeAst fileName text
            in
            { model | asts = Dict.insert fileName fileAst model.asts }
                |> (\newModel ->
                        { newModel
                            | processedFile =
                                ElmFile.createBase fileName fileAst
                                    |> ElmFile.parseReferences fileName fileAst
                        }
                   )
                |> andSendReport fileName


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch [ process ProcessFile ]


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    Model.Report.make fileName model.processedFile
        |> report
        |> And.execute model


port report : Value -> Cmd message


port process : (( String, String ) -> message) -> Sub message
