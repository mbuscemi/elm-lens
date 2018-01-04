module Types.FileLineResponse exposing (decode)

import Dict exposing (Dict)
import Json.Decode as JD exposing (Decoder)
import Json.Decode.Extra as JD
import Json.Encode exposing (Value)


type alias FileLineResponse =
    Dict String (Dict Int String)


decode : Value -> FileLineResponse
decode value =
    JD.decodeValue decoder value
        |> Result.withDefault Dict.empty


decoder : Decoder FileLineResponse
decoder =
    JD.dict <| JD.dict2 JD.int JD.string
