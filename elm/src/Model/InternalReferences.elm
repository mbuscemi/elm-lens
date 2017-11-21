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
        , internalRefsByFile : FileReferenceMap
    }


record : String -> String -> WithLowerCaseRefsByFile model -> WithLowerCaseRefsByFile model
record fileName fileText model =
    { model
        | internalRefsByFile =
            Dict.insert
                fileName
                (newReferences fileName model.fileASTs)
                model.internalRefsByFile
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
            names ++ functions

        Ast.Expression.List expressions ->
            List.foldl findInExpression functions expressions

        Ast.Expression.Tuple expressions ->
            List.foldl findInExpression functions expressions

        Ast.Expression.Record list ->
            List.foldl (\( _, exp ) funcs -> findInExpression exp funcs) functions list

        Ast.Expression.RecordUpdate _ list ->
            List.foldl (\( _, exp ) funcs -> findInExpression exp funcs) functions list

        Ast.Expression.If exp1 exp2 exp3 ->
            concatExpressions3 exp1 exp2 exp3 functions

        Ast.Expression.Let list expression ->
            List.foldl findInExpression functions (expression :: flattenExpressionTuples list)

        Ast.Expression.Case expression list ->
            List.foldl findInExpression functions (expression :: flattenExpressionTuples list)

        Ast.Expression.Lambda list expression ->
            List.foldl findInExpression functions (expression :: list)

        Ast.Expression.Application exp1 exp2 ->
            concatExpressions2 exp1 exp2 functions

        Ast.Expression.BinOp exp1 exp2 exp3 ->
            concatExpressions3 exp1 exp2 exp3 functions

        _ ->
            functions


flattenExpressionTuples : List ( Expression, Expression ) -> List Expression
flattenExpressionTuples expressionTuples =
    List.foldl (\( exp1, exp2 ) list -> exp1 :: exp2 :: list) [] expressionTuples


concatExpressions2 : Expression -> Expression -> List String -> List String
concatExpressions2 exp1 exp2 functions =
    List.foldl findInExpression functions [ exp1, exp2 ]


concatExpressions3 : Expression -> Expression -> Expression -> List String -> List String
concatExpressions3 exp1 exp2 exp3 functions =
    List.foldl findInExpression functions [ exp1, exp2, exp3 ]
