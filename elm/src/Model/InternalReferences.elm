module Model.InternalReferences exposing (record)

import Dict exposing (Dict)
import ReferenceMetaData exposing (ReferenceMetaData)


type alias FileReferenceMap =
    Dict String (Dict String ReferenceMetaData)


type alias WithLowerCaseRefsByFile model =
    { model | lowerCaseRefsByFile : FileReferenceMap }


record : String -> String -> WithLowerCaseRefsByFile model -> WithLowerCaseRefsByFile model
record fileName fileText model =
    model
