module And exposing (execute, noCommand)


noCommand : model -> ( model, Cmd message )
noCommand model =
    ( model, Cmd.none )


execute : Cmd message -> model -> ( model, Cmd message )
execute command model =
    ( model, command )
