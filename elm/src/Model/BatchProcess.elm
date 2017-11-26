module Model.BatchProcess exposing (isComplete)

import Dict
import Set exposing (Set)
import Types.ProjectFileData exposing (ProjectFileData)


type alias Model model =
    { model
        | projectFileData : ProjectFileData
        , projectFileRegistry : Set String
    }


isComplete : Model model -> Bool
isComplete model =
    Dict.size model.projectFileData >= Set.size model.projectFileRegistry
