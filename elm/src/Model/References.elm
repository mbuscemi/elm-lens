module Model.References exposing (collect)

import Ast.Expression exposing (Expression)
import Ast.Statement exposing (Statement(FunctionDeclaration))
import Types.Reference exposing (Reference)


type alias Model model =
    { model
        | fileAST : List Statement
        , references : List Reference
    }


collect : Model model -> Model model
collect model =
    { model
        | references =
            List.foldl collectReferences [] model.fileAST
                |> stringsToRefs
    }


stringsToRefs : List String -> List Reference
stringsToRefs refStrings =
    List.map Reference refStrings


collectReferences : Statement -> List String -> List String
collectReferences statement references =
    case statement of
        FunctionDeclaration _ _ expression ->
            findInExpression expression references

        _ ->
            references


findInExpression : Expression -> List String -> List String
findInExpression expression references =
    case expression of
        Ast.Expression.Variable [ "_" ] ->
            references

        Ast.Expression.Variable names ->
            names ++ references

        Ast.Expression.List expressions ->
            List.foldl findInExpression references expressions

        Ast.Expression.Tuple expressions ->
            List.foldl findInExpression references expressions

        Ast.Expression.Record list ->
            List.foldl (\( _, exp ) funcs -> findInExpression exp funcs) references list

        Ast.Expression.RecordUpdate _ list ->
            List.foldl (\( _, exp ) funcs -> findInExpression exp funcs) references list

        Ast.Expression.If exp1 exp2 exp3 ->
            concatExpressions3 exp1 exp2 exp3 references

        Ast.Expression.Let list expression ->
            List.foldl findInExpression references (expression :: flattenExpressionTuples list)

        Ast.Expression.Case expression list ->
            List.foldl findInExpression references (expression :: flattenExpressionTuples list)

        Ast.Expression.Lambda list expression ->
            List.foldl findInExpression references (expression :: list)

        Ast.Expression.Application exp1 exp2 ->
            concatExpressions2 exp1 exp2 references

        Ast.Expression.BinOp _ exp1 exp2 ->
            concatExpressions2 exp1 exp2 references

        _ ->
            references


flattenExpressionTuples : List ( Expression, Expression ) -> List Expression
flattenExpressionTuples expressionTuples =
    List.foldl (\( exp1, exp2 ) list -> exp1 :: exp2 :: list) [] expressionTuples


concatExpressions2 : Expression -> Expression -> List String -> List String
concatExpressions2 exp1 exp2 references =
    List.foldl findInExpression references [ exp1, exp2 ]


concatExpressions3 : Expression -> Expression -> Expression -> List String -> List String
concatExpressions3 exp1 exp2 exp3 references =
    List.foldl findInExpression references [ exp1, exp2, exp3 ]
