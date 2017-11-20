module Model.InternalReferences exposing (record)

import Ast.Expression exposing (Expression)
import Ast.Statement exposing (Statement(FunctionDeclaration))
import Dict exposing (Dict)
import ReferenceMetaData exposing (ReferenceMetaData)


type alias FileSyntaxMap =
    Dict String (List Statement)


type alias InternalReferences =
    Dict String ReferenceMetaData


type alias FileReferenceMap =
    Dict String InternalReferences


type alias WithLowerCaseRefsByFile model =
    { model
        | fileASTs : FileSyntaxMap
        , lowerCaseRefsByFile : FileReferenceMap
    }


record : String -> String -> WithLowerCaseRefsByFile model -> WithLowerCaseRefsByFile model
record fileName fileText model =
    { model
        | lowerCaseRefsByFile =
            Dict.insert
                fileName
                (newReferences fileName model.fileASTs)
                model.lowerCaseRefsByFile
    }


newReferences : String -> FileSyntaxMap -> InternalReferences
newReferences fileName fileSyntaxMap =
    getAstFor fileName fileSyntaxMap
        |> functionReferences
        |> List.foldl
            (\funcRef dict ->
                Dict.get funcRef dict
                    |> Maybe.withDefault ReferenceMetaData.empty
                    |> ReferenceMetaData.addInstance 0 ""
                    |> (\newData -> Dict.insert funcRef newData dict)
            )
            Dict.empty


getAstFor : String -> FileSyntaxMap -> List Statement
getAstFor fileName fileSyntaxMap =
    Dict.get fileName fileSyntaxMap
        |> Maybe.withDefault []


functionReferences : List Statement -> List String
functionReferences statements =
    List.foldl searchDeclarations [] statements


searchDeclarations : Statement -> List String -> List String
searchDeclarations statement functions =
    case statement of
        FunctionDeclaration _ _ expression ->
            findInExpression expression functions

        _ ->
            functions


findInExpression : Expression -> List String -> List String
findInExpression expression functions =
    case expression of
        Ast.Expression.Variable names ->
            functions ++ names

        Ast.Expression.List expressions ->
            List.foldl findInExpression functions expressions

        Ast.Expression.Tuple expressions ->
            List.foldl findInExpression functions expressions

        Ast.Expression.Record list ->
            List.foldl (\( _, expression ) funcs -> findInExpression expression funcs) functions list

        Ast.Expression.RecordUpdate _ list ->
            List.foldl (\( _, expression ) funcs -> findInExpression expression funcs) functions list

        Ast.Expression.If expression1 expression2 expression3 ->
            findInExpression expression1 [] ++ findInExpression expression2 [] ++ findInExpression expression3 [] ++ functions

        Ast.Expression.Let list expression ->
            findInExpression expression functions ++ List.foldl (\( exp1, exp2 ) funcs -> concatExpressions2 exp1 exp2 funcs) [] list

        Ast.Expression.Case expression list ->
            findInExpression expression functions ++ List.foldl (\( exp1, exp2 ) funcs -> concatExpressions2 exp1 exp2 funcs) [] list

        Ast.Expression.Lambda list expression ->
            findInExpression expression functions ++ List.foldl (\exp funcs -> findInExpression exp funcs) [] list

        Ast.Expression.Application exp1 exp2 ->
            concatExpressions2 exp1 exp2 functions

        Ast.Expression.BinOp exp1 exp2 exp3 ->
            concatExpressions3 exp1 exp2 exp3 functions

        _ ->
            functions


concatExpressions2 : Expression -> Expression -> List String -> List String
concatExpressions2 exp1 exp2 functions =
    findInExpression exp1 [] ++ findInExpression exp2 [] ++ functions


concatExpressions3 : Expression -> Expression -> Expression -> List String -> List String
concatExpressions3 exp1 exp2 exp3 functions =
    findInExpression exp1 [] ++ findInExpression exp2 [] ++ findInExpression exp3 [] ++ functions
