module Model.References exposing (collect)

import Ast.Expression exposing (Expression)
import Ast.Statement exposing (Statement(FunctionDeclaration, FunctionTypeDeclaration), Type)
import Set exposing (Set)
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
        FunctionDeclaration _ args expression ->
            findInExpression (funcArguments args) expression references

        FunctionTypeDeclaration _ type_ ->
            findInType type_ references

        _ ->
            references


funcArguments : List Expression -> Set String
funcArguments expressions =
    List.foldl collectFuncArguments Set.empty expressions


collectFuncArguments : Expression -> Set String -> Set String
collectFuncArguments expression args =
    case expression of
        Ast.Expression.Variable (name :: rest) ->
            collectFuncArguments (Ast.Expression.Variable rest) (Set.insert name args)

        _ ->
            args


findInExpression : Set String -> Expression -> List String -> List String
findInExpression arguments expression references =
    case expression of
        Ast.Expression.Variable (name :: rest) ->
            if Set.member name arguments then
                findInExpression arguments (Ast.Expression.Variable rest) references
            else
                findInExpression arguments (Ast.Expression.Variable rest) (name :: references)

        Ast.Expression.List expressions ->
            List.foldl (findInExpression arguments) references expressions

        Ast.Expression.Tuple expressions ->
            List.foldl (findInExpression arguments) references expressions

        Ast.Expression.Record list ->
            List.foldl (\( _, exp ) funcs -> findInExpression arguments exp funcs) references list

        Ast.Expression.RecordUpdate _ list ->
            List.foldl (\( _, exp ) funcs -> findInExpression arguments exp funcs) references list

        Ast.Expression.If exp1 exp2 exp3 ->
            concatExpressions3 arguments exp1 exp2 exp3 references

        Ast.Expression.Let list expression ->
            List.foldl (findInExpression arguments) references (expression :: flattenExpressionTuples list)

        Ast.Expression.Case expression list ->
            List.foldl (findInExpression arguments) references (expression :: flattenExpressionTuples list)

        Ast.Expression.Lambda lambdaArgs expression ->
            findInExpression (Set.union arguments (funcArguments lambdaArgs)) expression references

        Ast.Expression.Application exp1 exp2 ->
            concatExpressions2 arguments exp1 exp2 references

        Ast.Expression.BinOp _ exp1 exp2 ->
            concatExpressions2 arguments exp1 exp2 references

        _ ->
            references


flattenExpressionTuples : List ( Expression, Expression ) -> List Expression
flattenExpressionTuples expressionTuples =
    List.foldl (\( exp1, exp2 ) list -> exp1 :: exp2 :: list) [] expressionTuples


concatExpressions2 : Set String -> Expression -> Expression -> List String -> List String
concatExpressions2 arguments exp1 exp2 references =
    List.foldl (findInExpression arguments) references [ exp1, exp2 ]


concatExpressions3 : Set String -> Expression -> Expression -> Expression -> List String -> List String
concatExpressions3 arguments exp1 exp2 exp3 references =
    List.foldl (findInExpression arguments) references [ exp1, exp2, exp3 ]


findInType : Type -> List String -> List String
findInType type_ references =
    case type_ of
        Ast.Statement.TypeConstructor (name :: rest) subTypes ->
            List.foldl findInType (name :: references) subTypes

        Ast.Statement.TypeApplication type1 type2 ->
            List.foldl findInType references [ type1, type2 ]

        _ ->
            references
