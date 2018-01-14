module ElmFile.References exposing (fromFile)

import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Expression exposing (Expression, Function, LetDeclaration)
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Pattern exposing (Pattern)
import Elm.Syntax.Range as Range exposing (Range)
import Elm.Syntax.Ranged exposing (Ranged)
import Elm.Syntax.Type exposing (ValueConstructor)
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
import Set exposing (Set)
import Types.ImportDependencies exposing (ImportDependencies)
import Types.Imports exposing (Imports)
import Types.Reference exposing (Reference)
import Types.References exposing (References)


fromFile : String -> Imports -> ImportDependencies -> File -> References
fromFile fileName imports importDependencies file =
    file
        |> .declarations
        |> collectRefsFrom fileName imports importDependencies


collectRefsFrom : String -> Imports -> ImportDependencies -> List (Ranged Declaration) -> References
collectRefsFrom fileName imports importDependencies declarations =
    List.foldl (collectRefsFromDeclaration fileName imports importDependencies) Types.References.default declarations


collectRefsFromDeclaration : String -> Imports -> ImportDependencies -> Ranged Declaration -> References -> References
collectRefsFromDeclaration fileName imports importDependencies declaration references =
    case declaration of
        ( range, Elm.Syntax.Declaration.FuncDecl function ) ->
            List.foldl argumentsFromPattern Set.empty function.declaration.arguments
                |> (\args -> refsInExpression fileName args imports importDependencies function.declaration.expression references)
                |> appendSignatureReferences fileName imports importDependencies function

        ( range, Elm.Syntax.Declaration.AliasDecl typeAlias ) ->
            refsInTypeAnnotation fileName imports importDependencies typeAlias.typeAnnotation references

        ( range, Elm.Syntax.Declaration.TypeDecl type_ ) ->
            List.foldl (refsInValueConstructor fileName imports importDependencies) references type_.constructors

        ( range, Elm.Syntax.Declaration.PortDeclaration signature ) ->
            refsInTypeAnnotation fileName imports importDependencies signature.typeAnnotation references

        ( range, Elm.Syntax.Declaration.Destructuring rangedPattern rangedExpression ) ->
            refsInExpression fileName Set.empty imports importDependencies rangedExpression references

        _ ->
            references


refsInExpression : String -> Set String -> Imports -> ImportDependencies -> Ranged Expression -> References -> References
refsInExpression fileName arguments imports importDependencies expression references =
    case expression of
        ( range, Elm.Syntax.Expression.Application exps ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) references exps

        ( range, Elm.Syntax.Expression.OperatorApplication name _ exp1 exp2 ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) (addReference name fileName range arguments imports importDependencies references) [ exp1, exp2 ]

        ( range, Elm.Syntax.Expression.FunctionOrValue name ) ->
            addReference name fileName range arguments imports importDependencies references

        ( range, Elm.Syntax.Expression.IfBlock exp1 exp2 exp3 ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) references [ exp1, exp2, exp3 ]

        ( range, Elm.Syntax.Expression.Negation exp ) ->
            refsInExpression fileName arguments imports importDependencies exp references

        ( range, Elm.Syntax.Expression.TupledExpression exps ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) references exps

        ( range, Elm.Syntax.Expression.ParenthesizedExpression exp ) ->
            refsInExpression fileName arguments imports importDependencies exp references

        ( range, Elm.Syntax.Expression.LetExpression letBlock ) ->
            let
                expressions =
                    List.foldl letDeclarationExpressions [] letBlock.declarations

                typeAnnotations =
                    List.foldl letDeclarationTypeAnnotations [] letBlock.declarations
            in
            List.foldl (refsInExpression fileName arguments imports importDependencies) references (letBlock.expression :: expressions)
                |> (\refs -> List.foldl (refsInTypeAnnotation fileName imports importDependencies) refs typeAnnotations)

        ( range, Elm.Syntax.Expression.CaseExpression caseBlock ) ->
            let
                allArguments =
                    List.map Tuple.first caseBlock.cases
                        |> additionalArguments
                        |> Set.union arguments
            in
            List.foldl (refsInExpression fileName allArguments imports importDependencies) references (caseBlock.expression :: List.map Tuple.second caseBlock.cases)

        ( range, Elm.Syntax.Expression.LambdaExpression lambda ) ->
            let
                allArguments =
                    additionalArguments lambda.args
                        |> Set.union arguments
            in
            refsInExpression fileName allArguments imports importDependencies lambda.expression references

        ( range, Elm.Syntax.Expression.RecordExpr recordSetters ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) references (List.map Tuple.second recordSetters)

        ( range, Elm.Syntax.Expression.ListExpr exps ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) references exps

        ( range, Elm.Syntax.Expression.QualifiedExpr moduleName name ) ->
            Types.References.addExternal (Types.Imports.unaliasedModuleName moduleName imports) (Reference name range fileName) references

        ( range, Elm.Syntax.Expression.RecordAccess exp _ ) ->
            refsInExpression fileName arguments imports importDependencies exp references

        ( range, Elm.Syntax.Expression.RecordUpdateExpression recordUpdate ) ->
            List.foldl (refsInExpression fileName arguments imports importDependencies) references (List.map Tuple.second recordUpdate.updates)

        _ ->
            references


addReference : String -> String -> Range -> Set String -> Imports -> ImportDependencies -> References -> References
addReference expName fileName range arguments imports importDependencies references =
    case ( Set.member expName arguments, Types.Imports.moduleNameForDirectEntry expName imports, Types.ImportDependencies.moduleNameForSymbol expName importDependencies ) of
        ( True, _, _ ) ->
            references

        ( _, Just moduleName, _ ) ->
            Types.References.addExternal moduleName (Reference expName range fileName) references

        ( _, _, Just moduleName ) ->
            Types.References.addExternal moduleName (Reference expName range fileName) references

        _ ->
            Types.References.addInternal (Reference expName range fileName) references


addTypeReference : String -> String -> Range -> List String -> Imports -> ImportDependencies -> References -> References
addTypeReference typeName fileName range moduleName imports importDependencies references =
    case ( Types.Imports.moduleNameForDirectEntry typeName imports, Types.ImportDependencies.moduleNameForSymbol typeName importDependencies, moduleName ) of
        ( Just externalModule, _, _ ) ->
            Types.References.addExternal externalModule (Reference typeName range fileName) references

        ( _, Just externalModule, _ ) ->
            Types.References.addExternal externalModule (Reference typeName range fileName) references

        ( _, _, [] ) ->
            Types.References.addInternal (Reference typeName range fileName) references

        ( _, _, externalModule ) ->
            Types.References.addExternal (Types.Imports.unaliasedModuleName moduleName imports) (Reference typeName range fileName) references


refsInValueConstructor : String -> Imports -> ImportDependencies -> ValueConstructor -> References -> References
refsInValueConstructor fileName imports importDependencies valueConstructor references =
    List.foldl (refsInTypeAnnotation fileName imports importDependencies) references valueConstructor.arguments


refsInTypeAnnotation : String -> Imports -> ImportDependencies -> Ranged TypeAnnotation -> References -> References
refsInTypeAnnotation fileName imports importDependencies typeAnnotation references =
    case typeAnnotation of
        ( range, Elm.Syntax.TypeAnnotation.Typed moduleName name typeAnnotations ) ->
            List.foldl (refsInTypeAnnotation fileName imports importDependencies) (addTypeReference name fileName range moduleName imports importDependencies references) typeAnnotations

        ( range, Elm.Syntax.TypeAnnotation.Tupled typeAnnotations ) ->
            List.foldl (refsInTypeAnnotation fileName imports importDependencies) references typeAnnotations

        ( range, Elm.Syntax.TypeAnnotation.Record recordFields ) ->
            List.foldl (refsInRecordField fileName imports importDependencies) references recordFields

        ( range, Elm.Syntax.TypeAnnotation.GenericRecord _ recordFields ) ->
            List.foldl (refsInRecordField fileName imports importDependencies) references recordFields

        ( range, Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation ta1 ta2 ) ->
            List.foldl (refsInTypeAnnotation fileName imports importDependencies) references [ ta1, ta2 ]

        _ ->
            references


refsInRecordField : String -> Imports -> ImportDependencies -> ( String, Ranged TypeAnnotation ) -> References -> References
refsInRecordField fileName imports importDependencies ( string, typeAnnotation ) references =
    refsInTypeAnnotation fileName imports importDependencies typeAnnotation references


appendSignatureReferences : String -> Imports -> ImportDependencies -> Function -> References -> References
appendSignatureReferences fileName imports importDependencies function references =
    case function.signature of
        Just ( range, signature ) ->
            refsInTypeAnnotation fileName imports importDependencies signature.typeAnnotation references

        Nothing ->
            references


letDeclarationExpressions : Ranged LetDeclaration -> List (Ranged Expression) -> List (Ranged Expression)
letDeclarationExpressions letDeclaration expressions =
    case letDeclaration of
        ( range, Elm.Syntax.Expression.LetFunction function ) ->
            function.declaration.expression :: expressions

        ( range, Elm.Syntax.Expression.LetDestructuring pattern expression ) ->
            expression :: expressions


letDeclarationTypeAnnotations : Ranged LetDeclaration -> List (Ranged TypeAnnotation) -> List (Ranged TypeAnnotation)
letDeclarationTypeAnnotations letDeclaration typeAnnotations =
    case letDeclaration of
        ( range, Elm.Syntax.Expression.LetFunction function ) ->
            case function.signature of
                Just ( range, signature ) ->
                    signature.typeAnnotation :: typeAnnotations

                Nothing ->
                    typeAnnotations

        _ ->
            typeAnnotations


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
