module Model.References exposing (collect)

import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Expression exposing (Expression, Function)
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
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
            refsInExpression function.declaration.expression references
                |> appendSignatureReferences function

        Elm.Syntax.Declaration.AliasDecl typeAlias ->
            refsInTypeAnnotation typeAlias.typeAnnotation references

        _ ->
            references


refsInExpression : Expression -> List Reference -> List Reference
refsInExpression expression references =
    let
        ( range, innerExpression ) =
            expression
    in
    case innerExpression of
        Elm.Syntax.Expression.Application exps ->
            List.foldl refsInExpression references exps

        Elm.Syntax.Expression.OperatorApplication _ _ exp1 exp2 ->
            List.foldl refsInExpression references [ exp1, exp2 ]

        Elm.Syntax.Expression.FunctionOrValue name ->
            Reference name :: references

        Elm.Syntax.Expression.IfBlock exp1 exp2 exp3 ->
            List.foldl refsInExpression references [ exp1, exp2, exp3 ]

        Elm.Syntax.Expression.Negation exp ->
            refsInExpression exp references

        Elm.Syntax.Expression.TupledExpression exps ->
            List.foldl refsInExpression references exps

        Elm.Syntax.Expression.ParenthesizedExpression exp ->
            refsInExpression exp references

        Elm.Syntax.Expression.LetExpression letBlock ->
            refsInExpression letBlock.expression references

        Elm.Syntax.Expression.CaseExpression caseBlock ->
            refsInExpression caseBlock.expression references

        Elm.Syntax.Expression.ListExpr exps ->
            List.foldl refsInExpression references exps

        Elm.Syntax.Expression.RecordAccessFunction name ->
            Reference name :: references

        _ ->
            references


refsInTypeAnnotation : TypeAnnotation -> List Reference -> List Reference
refsInTypeAnnotation typeAnnotation references =
    case typeAnnotation of
        Elm.Syntax.TypeAnnotation.Typed moduleName name typeAnnotations range ->
            List.foldl refsInTypeAnnotation (Reference name :: references) typeAnnotations

        _ ->
            references


appendSignatureReferences : Function -> List Reference -> List Reference
appendSignatureReferences function references =
    case function.signature of
        Just signature ->
            refsInTypeAnnotation signature.typeAnnotation references

        Nothing ->
            references
