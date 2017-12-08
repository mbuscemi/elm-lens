module Types.ProjectFileData exposing (ProjectFileData, insert)

import Dict exposing (Dict)
import Types.FileData exposing (FileData)
import Types.Report exposing (Report)


type alias ProjectFileData =
    Dict String FileData


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
