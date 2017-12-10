port module Worker exposing (main)

import And
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode exposing (Value)
import Model.AST
import Model.Exposings
import Model.ModuleName
import Model.References
import Model.Report
import Model.TopLevelExpressions
import Types.Exposings exposing (Exposings)
import Types.Imports exposing (Imports)
import Types.References exposing (References)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model =
    { fileAST : Result (List String) RawFile
    , moduleName : ModuleName
    , imports : Imports
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : References
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
    { fileAST = Err []
    , moduleName = []
    , imports = Types.Imports.default
    , topLevelExpressions = Types.TopLevelExpressions.default
    , exposings = Types.Exposings.default
    , references = Types.References.default
    }
        |> And.doNothing


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        ProcessFile ( fileName, text ) ->
            model
                |> Model.AST.buildFrom text
                |> Model.ModuleName.record
                |> Model.TopLevelExpressions.collect
                |> Model.Exposings.collect
                |> Model.References.collect
                |> andSendReport fileName


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ process ProcessFile ]


andSendReport : String -> Model -> ( Model, Cmd Message )
andSendReport fileName model =
    And.execute model (report <| Model.Report.make fileName model)


port report : Value -> Cmd message


port process : (( String, String ) -> message) -> Sub message
