module Types.KeyedReferences exposing (KeyedReferences, decoder, encoder)

import Dict exposing (Dict)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.Reference exposing (Reference)


type alias KeyedReferences =
    Dict String (List Reference)


encoder : KeyedReferences -> Value
encoder keyedReferences =
    JE.object <| encodeInternalsDict keyedReferences


encodeInternalsDict : Dict String (List Reference) -> List ( String, Value )
encodeInternalsDict internals =
    Dict.toList internals
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


decoder : Decoder KeyedReferences
decoder =
    JD.map toDictionary tupleListDecoder


toDictionary : List ( String, List Reference ) -> Dict String (List Reference)
toDictionary dictList =
    List.foldl addEntry Dict.empty dictList


addEntry : ( String, List Reference ) -> Dict String (List Reference) -> Dict String (List Reference)
addEntry ( key, references ) dict =
    Dict.insert key references dict


tupleListDecoder : Decoder (List ( String, List Reference ))
tupleListDecoder =
    JD.keyValuePairs Types.Reference.listDecoder
