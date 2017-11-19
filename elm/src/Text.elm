module Text exposing (preprocess)

import Parser exposing ((|.), Parser, keyword, oneOf, run, succeed)
import Parsing exposing (spaces)


preprocess : String -> List String
preprocess text =
    text
        |> splitOnNewLine
        |> blankOutCommentLines


splitOnNewLine : String -> List String
splitOnNewLine text =
    String.split "\n" text


blankOutCommentLines : List String -> List String
blankOutCommentLines textLines =
    List.map
        (\line ->
            if isComment line then
                ""
            else
                line
        )
        textLines


isComment : String -> Bool
isComment line =
    run spacesThenComment line
        |> Result.withDefault False


spacesThenComment : Parser Bool
spacesThenComment =
    oneOf
        [ succeed True
            |. spaces
            |. keyword "--"
        , succeed False
        ]
