module Types.FileLineRequest exposing (FileLineRequest, decoder, default, encoder)

import Dict exposing (Dict)
import Json.Decode as JD exposing (Decoder)
import Json.Decode.Extra as JD
import Json.Encode as JE exposing (Value)
import Set exposing (Set)


type alias FileLineRequest =
    Dict String (Set Int)


default : FileLineRequest
default =
    Dict.empty


encoder : FileLineRequest -> Value
encoder fileLineRequest =
    Dict.toList fileLineRequest
        |> List.map encodeEntry
        |> JE.object


encodeEntry : ( String, Set Int ) -> ( String, Value )
encodeEntry ( fileName, lines ) =
    ( fileName, JE.list <| List.map JE.int <| Set.toList lines )


decoder : Decoder FileLineRequest
decoder =
    JD.dict <| JD.set JD.int
