port module And.File exposing (requestOpen)

import And


requestOpen : String -> Int -> Int -> model -> ( model, Cmd message )
requestOpen filePath row column model =
    And.execute model <| fileOpenRequest ( filePath, row, column )


port fileOpenRequest : ( String, Int, Int ) -> Cmd message
