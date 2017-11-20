module Model.AST exposing (parseFile)

import Ast exposing (parse)
import Ast.Statement exposing (Statement)
import Dict exposing (Dict)


type alias FileSyntaxMap =
    Dict String (List Statement)


type alias WithFileASTs model =
    { model | fileASTs : FileSyntaxMap }


parseFile : String -> String -> WithFileASTs model -> WithFileASTs model
parseFile fileName fileText model =
    { model | fileASTs = Dict.insert fileName (process fileText) model.fileASTs }


process : String -> List Statement
process text =
    case parse text of
        Ok ( _, _, list ) ->
            list

        Err _ ->
            []
