module Types.ProjectFileData exposing (ProjectFileData)

import Dict exposing (Dict)
import Types.FileData exposing (FileData)


type alias ProjectFileData =
    Dict String FileData
