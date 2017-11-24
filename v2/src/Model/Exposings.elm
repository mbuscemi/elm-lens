module Model.Exposings exposing (collect)

import Ast.Statement exposing (ExportSet(AllExport, FunctionExport, SubsetExport, TypeExport), Statement(ModuleDeclaration, PortModuleDeclaration))
import Dict
import Set
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
            useAllTopLevelExpressions model

        PortModuleDeclaration _ AllExport ->
            useAllTopLevelExpressions model

        ModuleDeclaration _ (SubsetExport exports) ->
            collectAll exports exposings

        PortModuleDeclaration _ (SubsetExport exports) ->
            collectAll exports exposings

        _ ->
            exposings


useAllTopLevelExpressions : Model model -> Exposings
useAllTopLevelExpressions model =
    { functions =
        model.topLevelExpressions.functions
            |> Dict.keys
            |> Set.fromList
    , types =
        Dict.union model.topLevelExpressions.types model.topLevelExpressions.typeAliases
            |> Dict.keys
            |> Set.fromList
    }


collectAll : List ExportSet -> Exposings -> Exposings
collectAll exports exposings =
    List.foldl collectFromExports exposings exports


collectFromExports : ExportSet -> Exposings -> Exposings
collectFromExports export exposings =
    case export of
        FunctionExport name ->
            { exposings | functions = Set.insert name exposings.functions }

        TypeExport name _ ->
            { exposings | types = Set.insert name exposings.types }

        _ ->
            exposings
