module Model.AST exposing (buildFrom)

import Elm.Parser exposing (parse)
import Elm.RawFile exposing (RawFile)


type alias WithFileAST model =
    { model | fileAST : Result (List String) RawFile }


buildFrom : String -> WithFileAST model -> WithFileAST model
buildFrom fileText model =
    { model | fileAST = parse fileText }
