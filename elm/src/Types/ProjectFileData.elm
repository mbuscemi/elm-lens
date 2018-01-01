module Types.ProjectFileData exposing (ProjectFileData, default, insert, moduleName)

import Dict exposing (Dict)
import Elm.Syntax.Base exposing (ModuleName)
import Types.FileData exposing (FileData)
import Types.Report exposing (Report)


type alias ProjectFileData =
    Dict String FileData


default : ProjectFileData
default =
    Dict.empty


insert : Report -> ProjectFileData -> ProjectFileData
insert report projectFileData =
    Dict.insert
        report.fileName
        (FileData
            report.moduleName
            report.topLevelExpressions
            report.exposings
            report.references
        )
        projectFileData


moduleName : String -> ProjectFileData -> ModuleName
moduleName fileName projectFileData =
    Dict.get fileName projectFileData
        |> Maybe.withDefault Types.FileData.default
        |> .moduleName
