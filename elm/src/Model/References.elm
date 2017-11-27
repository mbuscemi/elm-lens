module Model.References exposing (collect)

import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Expression exposing (Expression, Function, LetDeclaration)
import Elm.Syntax.Pattern exposing (Pattern)
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
import Set exposing (Set)
import Types.Reference exposing (Reference)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , references : List Reference
    }


collect : Model model -> Model model
collect model =
    { model | references = collectReferences model.fileAST }


collectReferences : Result (List String) RawFile -> List Reference
collectReferences parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .declarations
                |> collectRefsFrom

        Err errors ->
            []


collectRefsFrom : List Declaration -> List Reference
collectRefsFrom declarations =
    List.foldl collectRefsFromDeclaration [] declarations


collectRefsFromDeclaration : Declaration -> List Reference -> List Reference
collectRefsFromDeclaration declaration references =
    case declaration of
        Elm.Syntax.Declaration.FuncDecl function ->
            List.foldl argumentsFromPattern Set.empty function.declaration.arguments
                |> (\args -> refsInExpression args function.declaration.expression references)
                |> appendSignatureReferences function

        Elm.Syntax.Declaration.AliasDecl typeAlias ->
            refsInTypeAnnotation typeAlias.typeAnnotation references

        _ ->
            references


refsInExpression : Set String -> Expression -> List Reference -> List Reference
refsInExpression arguments expression references =
    let
        ( range, innerExpression ) =
            expression
    in
    case innerExpression of
        Elm.Syntax.Expression.Application exps ->
            List.foldl (refsInExpression arguments) references exps

        Elm.Syntax.Expression.OperatorApplication _ _ exp1 exp2 ->
            List.foldl (refsInExpression arguments) references [ exp1, exp2 ]

        Elm.Syntax.Expression.FunctionOrValue name ->
            addReference name arguments references

        Elm.Syntax.Expression.IfBlock exp1 exp2 exp3 ->
            List.foldl (refsInExpression arguments) references [ exp1, exp2, exp3 ]

        Elm.Syntax.Expression.Negation exp ->
            refsInExpression arguments exp references

        Elm.Syntax.Expression.TupledExpression exps ->
            List.foldl (refsInExpression arguments) references exps

        Elm.Syntax.Expression.ParenthesizedExpression exp ->
            refsInExpression arguments exp references

        Elm.Syntax.Expression.LetExpression letBlock ->
            let
                expressions =
                    List.foldl letDeclarationExpressions [] letBlock.declarations
            in
            List.foldl (refsInExpression arguments) references (letBlock.expression :: expressions)

        Elm.Syntax.Expression.CaseExpression caseBlock ->
            let
                allArguments =
                    Set.union arguments (additionalArguments (List.map Tuple.first caseBlock.cases))
            in
            List.foldl (refsInExpression allArguments) references (caseBlock.expression :: List.map Tuple.second caseBlock.cases)

        Elm.Syntax.Expression.LambdaExpression lambda ->
            let
                allArguments =
                    Set.union arguments (additionalArguments lambda.args)
            in
            refsInExpression allArguments lambda.expression references

        Elm.Syntax.Expression.RecordExpr recordSetters ->
            List.foldl (refsInExpression arguments) references (List.map Tuple.second recordSetters)

        Elm.Syntax.Expression.ListExpr exps ->
            List.foldl (refsInExpression arguments) references exps

        Elm.Syntax.Expression.QualifiedExpr moduleName name ->
            addReference name arguments references

        Elm.Syntax.Expression.RecordAccessFunction name ->
            addReference name arguments references

        Elm.Syntax.Expression.RecordUpdateExpression recordUpdate ->
            List.foldl (refsInExpression arguments) references (List.map Tuple.second recordUpdate.updates)

        _ ->
            references


addReference : String -> Set String -> List Reference -> List Reference
addReference name arguments references =
    if Set.member name arguments then
        references
    else
        Reference name :: references


refsInTypeAnnotation : TypeAnnotation -> List Reference -> List Reference
refsInTypeAnnotation typeAnnotation references =
    case typeAnnotation of
        Elm.Syntax.TypeAnnotation.Typed moduleName name typeAnnotations range ->
            List.foldl refsInTypeAnnotation (Reference name :: references) typeAnnotations

        Elm.Syntax.TypeAnnotation.Tupled typeAnnotations range ->
            List.foldl refsInTypeAnnotation references typeAnnotations

        Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation ta1 ta2 range ->
            List.foldl refsInTypeAnnotation references [ ta1, ta2 ]

        _ ->
            references


appendSignatureReferences : Function -> List Reference -> List Reference
appendSignatureReferences function references =
    case function.signature of
        Just signature ->
            refsInTypeAnnotation signature.typeAnnotation references

        Nothing ->
            references


letDeclarationExpressions : LetDeclaration -> List Expression -> List Expression
letDeclarationExpressions letDeclaration expressions =
    case letDeclaration of
        Elm.Syntax.Expression.LetFunction function ->
            function.declaration.expression :: expressions

        Elm.Syntax.Expression.LetDestructuring pattern expression ->
            expression :: expressions


additionalArguments : List Pattern -> Set String
additionalArguments patterns =
    List.foldl argumentsFromPattern Set.empty patterns


argumentsFromPattern : Pattern -> Set String -> Set String
argumentsFromPattern pattern arguments =
    case pattern of
        Elm.Syntax.Pattern.VarPattern name range ->
            Set.insert name arguments

        Elm.Syntax.Pattern.NamedPattern qualifiedNameRef patterns range ->
            List.foldl argumentsFromPattern arguments patterns

        _ ->
            arguments
