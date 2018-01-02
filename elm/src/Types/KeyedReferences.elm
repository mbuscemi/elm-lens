module Types.KeyedReferences exposing (KeyedReferences, decoder, encoder, toDictionary, update)

import Dict exposing (Dict)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.Reference exposing (Reference)


type alias KeyedReferences =
    Dict String (List Reference)


encoder : KeyedReferences -> Value
encoder keyedReferences =
    JE.object <| encodeInternalsDict keyedReferences


decoder : Decoder KeyedReferences
decoder =
    JD.map toDictionary tupleListDecoder


update : KeyedReferences -> KeyedReferences -> KeyedReferences
update keyedRefs1 keyedRefs2 =
    Dict.merge Dict.insert existsInBoth Dict.insert keyedRefs1 keyedRefs2 Dict.empty


existsInBoth : String -> List Reference -> List Reference -> KeyedReferences -> KeyedReferences
existsInBoth name list1 list2 dict =
    let
        newList =
            case List.head list2 of
                Just newElement ->
                    newElement :: list1

                Nothing ->
                    list1
    in
    Dict.insert name newList dict


toDictionary : List ( String, List Reference ) -> Dict String (List Reference)
toDictionary dictList =
    List.foldl addEntry Dict.empty dictList


encodeInternalsDict : Dict String (List Reference) -> List ( String, Value )
encodeInternalsDict internals =
    Dict.toList internals
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


addEntry : ( String, List Reference ) -> Dict String (List Reference) -> Dict String (List Reference)
addEntry ( key, references ) dict =
    Dict.insert key references dict


tupleListDecoder : Decoder (List ( String, List Reference ))
tupleListDecoder =
    JD.keyValuePairs Types.Reference.listDecoder
