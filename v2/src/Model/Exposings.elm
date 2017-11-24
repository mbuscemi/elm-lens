module Model.Exposings exposing (collect)

import Ast.Statement exposing (ExportSet(AllExport, FunctionExport, SubsetExport, TypeExport), Statement(ModuleDeclaration))
import Types.Exposings exposing (Exposings)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Model model =
    { model
        | fileAST : List Statement
        , topLevelExpressions : TopLevelExpressions
        , exposings : Exposings
    }


collect : Model model -> Model model
collect model =
    { model | exposings = List.foldl (collectExposings model) model.exposings model.fileAST }


collectExposings : Model model -> Statement -> Exposings -> Exposings
collectExposings model statement exposings =
    case statement of
        ModuleDeclaration _ AllExport ->
            { functions = model.topLevelExpressions.functions
            , types = List.append model.topLevelExpressions.types model.topLevelExpressions.typeAliases
            }

        ModuleDeclaration _ (SubsetExport exports) ->
            List.foldl collectFromExports exposings exports

        _ ->
            exposings


collectFromExports : ExportSet -> Exposings -> Exposings
collectFromExports export exposings =
    case export of
        FunctionExport name ->
            { exposings | functions = name :: exposings.functions }

        TypeExport name _ ->
            { exposings | types = name :: exposings.types }

        _ ->
            exposings
