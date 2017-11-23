module Model.TopLevelExpressions exposing (collect)

import Ast.Statement exposing (Statement(FunctionDeclaration, TypeAliasDeclaration, TypeDeclaration), Type(TypeConstructor))
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | fileAST : List Statement
        , topLevelExpressions : TopLevelExpressions
    }


collect : Model model -> Model model
collect model =
    { model | topLevelExpressions = List.foldl collectExpressions model.topLevelExpressions model.fileAST }


collectExpressions : Statement -> TopLevelExpressions -> TopLevelExpressions
collectExpressions statement expressions =
    case statement of
        FunctionDeclaration name _ _ ->
            { expressions | functions = name :: expressions.functions }

        TypeDeclaration (TypeConstructor names _) _ ->
            { expressions | types = firstElement names :: expressions.types }

        TypeAliasDeclaration (TypeConstructor names _) _ ->
            { expressions | typeAliases = firstElement names :: expressions.typeAliases }

        _ ->
            expressions


firstElement : List String -> String
firstElement singleEntry =
    List.head singleEntry
        |> Maybe.withDefault ""
