module Model.AST exposing (buildFrom)

import Ast exposing (parse)
import Ast.Statement exposing (Statement)


type alias FileSyntaxMap =
    List Statement


type alias WithFileAST model =
    { model | fileAST : FileSyntaxMap }


buildFrom : String -> WithFileAST model -> WithFileAST model
buildFrom fileText model =
    { model | fileAST = process fileText }


process : String -> List Statement
process text =
    case parse text of
        Ok ( _, _, list ) ->
            list

        Err _ ->
            []
