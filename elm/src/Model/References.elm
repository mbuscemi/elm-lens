module Model.References exposing (collect)

import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Expression exposing (Expression, Function, LetDeclaration)
import Elm.Syntax.Pattern exposing (Pattern)
import Elm.Syntax.Ranged exposing (Ranged)
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


collectRefsFrom : List (Ranged Declaration) -> List Reference
collectRefsFrom declarations =
    List.foldl collectRefsFromDeclaration [] declarations


collectRefsFromDeclaration : Ranged Declaration -> List Reference -> List Reference
collectRefsFromDeclaration declaration references =
    case declaration of
        ( range, Elm.Syntax.Declaration.FuncDecl function ) ->
            List.foldl argumentsFromPattern Set.empty function.declaration.arguments
                |> (\args -> refsInExpression args function.declaration.expression references)
                |> appendSignatureReferences function

        ( range, Elm.Syntax.Declaration.AliasDecl typeAlias ) ->
            refsInTypeAnnotation typeAlias.typeAnnotation references

        _ ->
            references


refsInExpression : Set String -> Ranged Expression -> List Reference -> List Reference
refsInExpression arguments expression references =
    case expression of
        ( range, Elm.Syntax.Expression.Application exps ) ->
            List.foldl (refsInExpression arguments) references exps

        ( range, Elm.Syntax.Expression.OperatorApplication _ _ exp1 exp2 ) ->
            List.foldl (refsInExpression arguments) references [ exp1, exp2 ]

        ( range, Elm.Syntax.Expression.FunctionOrValue name ) ->
            addReference name arguments references

        ( range, Elm.Syntax.Expression.IfBlock exp1 exp2 exp3 ) ->
            List.foldl (refsInExpression arguments) references [ exp1, exp2, exp3 ]

        ( range, Elm.Syntax.Expression.Negation exp ) ->
            refsInExpression arguments exp references

        ( range, Elm.Syntax.Expression.TupledExpression exps ) ->
            List.foldl (refsInExpression arguments) references exps

        ( range, Elm.Syntax.Expression.ParenthesizedExpression exp ) ->
            refsInExpression arguments exp references

        ( range, Elm.Syntax.Expression.LetExpression letBlock ) ->
            let
                expressions =
                    List.foldl letDeclarationExpressions [] letBlock.declarations
            in
            List.foldl (refsInExpression arguments) references (letBlock.expression :: expressions)

        ( range, Elm.Syntax.Expression.CaseExpression caseBlock ) ->
            let
                allArguments =
                    Set.union arguments (additionalArguments (List.map Tuple.first caseBlock.cases))
            in
            List.foldl (refsInExpression allArguments) references (caseBlock.expression :: List.map Tuple.second caseBlock.cases)

        ( range, Elm.Syntax.Expression.LambdaExpression lambda ) ->
            let
                allArguments =
                    Set.union arguments (additionalArguments lambda.args)
            in
            refsInExpression allArguments lambda.expression references

        ( range, Elm.Syntax.Expression.RecordExpr recordSetters ) ->
            List.foldl (refsInExpression arguments) references (List.map Tuple.second recordSetters)

        ( range, Elm.Syntax.Expression.ListExpr exps ) ->
            List.foldl (refsInExpression arguments) references exps

        ( range, Elm.Syntax.Expression.QualifiedExpr moduleName name ) ->
            addReference name arguments references

        ( range, Elm.Syntax.Expression.RecordAccessFunction name ) ->
            addReference name arguments references

        ( range, Elm.Syntax.Expression.RecordUpdateExpression recordUpdate ) ->
            List.foldl (refsInExpression arguments) references (List.map Tuple.second recordUpdate.updates)

        _ ->
            references


addReference : String -> Set String -> List Reference -> List Reference
addReference name arguments references =
    if Set.member name arguments then
        references
    else
        Reference name :: references


refsInTypeAnnotation : Ranged TypeAnnotation -> List Reference -> List Reference
refsInTypeAnnotation typeAnnotation references =
    case typeAnnotation of
        ( range, Elm.Syntax.TypeAnnotation.Typed moduleName name typeAnnotations ) ->
            List.foldl refsInTypeAnnotation (Reference name :: references) typeAnnotations

        ( range, Elm.Syntax.TypeAnnotation.Tupled typeAnnotations ) ->
            List.foldl refsInTypeAnnotation references typeAnnotations

        ( range, Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation ta1 ta2 ) ->
            List.foldl refsInTypeAnnotation references [ ta1, ta2 ]

        _ ->
            references


appendSignatureReferences : Function -> List Reference -> List Reference
appendSignatureReferences function references =
    case function.signature of
        Just ( range, signature ) ->
            refsInTypeAnnotation signature.typeAnnotation references

        Nothing ->
            references


letDeclarationExpressions : Ranged LetDeclaration -> List (Ranged Expression) -> List (Ranged Expression)
letDeclarationExpressions letDeclaration expressions =
    case letDeclaration of
        ( range, Elm.Syntax.Expression.LetFunction function ) ->
            function.declaration.expression :: expressions

        ( range, Elm.Syntax.Expression.LetDestructuring pattern expression ) ->
            expression :: expressions


additionalArguments : List (Ranged Pattern) -> Set String
additionalArguments patterns =
    List.foldl argumentsFromPattern Set.empty patterns


argumentsFromPattern : Ranged Pattern -> Set String -> Set String
argumentsFromPattern pattern arguments =
    case pattern of
        ( range, Elm.Syntax.Pattern.VarPattern name ) ->
            Set.insert name arguments

        ( range, Elm.Syntax.Pattern.NamedPattern qualifiedNameRef patterns ) ->
            List.foldl argumentsFromPattern arguments patterns

        _ ->
            arguments
