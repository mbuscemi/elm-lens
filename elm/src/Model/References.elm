module Model.References exposing (collect)

import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Expression exposing (Expression, Function, LetDeclaration)
import Elm.Syntax.Pattern exposing (Pattern)
import Elm.Syntax.Ranged exposing (Ranged)
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
import Set exposing (Set)
import Types.Imports exposing (Imports)
import Types.Reference exposing (Reference)
import Types.References exposing (References)


type alias Model model =
    { model
        | fileAST : Result (List String) RawFile
        , imports : Imports
        , references : References
    }


collect : Model model -> Model model
collect model =
    { model | references = collectReferences model.imports model.fileAST }


collectReferences : Imports -> Result (List String) RawFile -> References
collectReferences imports parseResult =
    case parseResult of
        Ok rawFile ->
            process init rawFile
                |> .declarations
                |> collectRefsFrom imports

        Err errors ->
            Types.References.default


collectRefsFrom : Imports -> List (Ranged Declaration) -> References
collectRefsFrom imports declarations =
    List.foldl (collectRefsFromDeclaration imports) Types.References.default declarations


collectRefsFromDeclaration : Imports -> Ranged Declaration -> References -> References
collectRefsFromDeclaration imports declaration references =
    case declaration of
        ( range, Elm.Syntax.Declaration.FuncDecl function ) ->
            List.foldl argumentsFromPattern Set.empty function.declaration.arguments
                |> (\args -> refsInExpression args imports function.declaration.expression references)
                |> appendSignatureReferences imports function

        ( range, Elm.Syntax.Declaration.AliasDecl typeAlias ) ->
            refsInTypeAnnotation imports typeAlias.typeAnnotation references

        _ ->
            references


refsInExpression : Set String -> Imports -> Ranged Expression -> References -> References
refsInExpression arguments imports expression references =
    case expression of
        ( range, Elm.Syntax.Expression.Application exps ) ->
            List.foldl (refsInExpression arguments imports) references exps

        ( range, Elm.Syntax.Expression.OperatorApplication _ _ exp1 exp2 ) ->
            List.foldl (refsInExpression arguments imports) references [ exp1, exp2 ]

        ( range, Elm.Syntax.Expression.FunctionOrValue name ) ->
            addReference name arguments imports references

        ( range, Elm.Syntax.Expression.IfBlock exp1 exp2 exp3 ) ->
            List.foldl (refsInExpression arguments imports) references [ exp1, exp2, exp3 ]

        ( range, Elm.Syntax.Expression.Negation exp ) ->
            refsInExpression arguments imports exp references

        ( range, Elm.Syntax.Expression.TupledExpression exps ) ->
            List.foldl (refsInExpression arguments imports) references exps

        ( range, Elm.Syntax.Expression.ParenthesizedExpression exp ) ->
            refsInExpression arguments imports exp references

        ( range, Elm.Syntax.Expression.LetExpression letBlock ) ->
            let
                expressions =
                    List.foldl letDeclarationExpressions [] letBlock.declarations
            in
            List.foldl (refsInExpression arguments imports) references (letBlock.expression :: expressions)

        ( range, Elm.Syntax.Expression.CaseExpression caseBlock ) ->
            let
                allArguments =
                    List.map Tuple.first caseBlock.cases
                        |> additionalArguments
                        |> Set.union arguments
            in
            List.foldl (refsInExpression allArguments imports) references (caseBlock.expression :: List.map Tuple.second caseBlock.cases)

        ( range, Elm.Syntax.Expression.LambdaExpression lambda ) ->
            let
                allArguments =
                    additionalArguments lambda.args
                        |> Set.union arguments
            in
            refsInExpression allArguments imports lambda.expression references

        ( range, Elm.Syntax.Expression.RecordExpr recordSetters ) ->
            List.foldl (refsInExpression arguments imports) references (List.map Tuple.second recordSetters)

        ( range, Elm.Syntax.Expression.ListExpr exps ) ->
            List.foldl (refsInExpression arguments imports) references exps

        ( range, Elm.Syntax.Expression.QualifiedExpr moduleName name ) ->
            Types.References.addExternal (Types.Imports.unaliasedModuleName moduleName imports) (Reference name) references

        ( range, Elm.Syntax.Expression.RecordAccessFunction name ) ->
            addReference name arguments imports references

        ( range, Elm.Syntax.Expression.RecordUpdateExpression recordUpdate ) ->
            List.foldl (refsInExpression arguments imports) references (List.map Tuple.second recordUpdate.updates)

        _ ->
            references


addReference : String -> Set String -> Imports -> References -> References
addReference name arguments imports references =
    case ( Set.member name arguments, Types.Imports.moduleNameForDirectEntry name imports ) of
        ( True, _ ) ->
            references

        ( _, Just moduleName ) ->
            Types.References.addExternal moduleName (Reference name) references

        _ ->
            Types.References.addInternal (Reference name) references


refsInTypeAnnotation : Imports -> Ranged TypeAnnotation -> References -> References
refsInTypeAnnotation imports typeAnnotation references =
    case typeAnnotation of
        ( range, Elm.Syntax.TypeAnnotation.Typed moduleName name typeAnnotations ) ->
            List.foldl (refsInTypeAnnotation imports) (addReference name Set.empty imports references) typeAnnotations

        ( range, Elm.Syntax.TypeAnnotation.Tupled typeAnnotations ) ->
            List.foldl (refsInTypeAnnotation imports) references typeAnnotations

        ( range, Elm.Syntax.TypeAnnotation.Record recordFields ) ->
            List.foldl (refsInRecordField imports) references recordFields

        ( range, Elm.Syntax.TypeAnnotation.GenericRecord _ recordFields ) ->
            List.foldl (refsInRecordField imports) references recordFields

        ( range, Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation ta1 ta2 ) ->
            List.foldl (refsInTypeAnnotation imports) references [ ta1, ta2 ]

        _ ->
            references


refsInRecordField : Imports -> ( String, Ranged TypeAnnotation ) -> References -> References
refsInRecordField imports ( string, typeAnnotation ) references =
    refsInTypeAnnotation imports typeAnnotation references


appendSignatureReferences : Imports -> Function -> References -> References
appendSignatureReferences imports function references =
    case function.signature of
        Just ( range, signature ) ->
            refsInTypeAnnotation imports signature.typeAnnotation references

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
