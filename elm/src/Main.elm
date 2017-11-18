module Main exposing (main)


type alias Model =
    {}


type Message
    = None


main : Program Never Model Message
main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = always Sub.none
        }


init : ( Model, Cmd Message )
init =
    {} ! []


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    model ! []
