module And exposing (doNothing, execute, executeNext)

import Task


doNothing : model -> ( model, Cmd message )
doNothing model =
    ( model, Cmd.none )


execute : model -> Cmd message -> ( model, Cmd message )
execute model command =
    ( model, command )


executeNext : message -> model -> ( model, Cmd message )
executeNext message model =
    execute model (Task.perform (always message) (Task.succeed ()))
