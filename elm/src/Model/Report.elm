module Model.Report exposing (make)

import ElmFile exposing (ElmFile)
import Json.Encode exposing (Value, list, object, string)
import Types.Report exposing (Report)


make : String -> ElmFile -> Value
make fileName elmFile =
    Report
        fileName
        elmFile.moduleName
        elmFile.topLevelExpressions
        elmFile.exposings
        elmFile.references
        |> Types.Report.encoder
