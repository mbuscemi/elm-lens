module And exposing (doNothing, execute)


doNothing : model -> ( model, Cmd message )
doNothing model =
    ( model, Cmd.none )


execute : model -> Cmd message -> ( model, Cmd message )
execute model command =
    ( model, command )
