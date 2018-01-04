module Types.References exposing (References, addExternal, addInternal, decoder, default, encoder)

import Dict exposing (Dict)
import Dict.Extra as Dict
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.KeyedReferences exposing (KeyedReferences)
import Types.Reference exposing (Reference)
import Util.ModuleName


type alias References =
    { internal : KeyedReferences
    , external : Dict ModuleName KeyedReferences
    }


default : References
default =
    { internal = Dict.empty
    , external = Dict.empty
    }


encoder : References -> Value
encoder references =
    JE.object
        [ ( "internal", Types.KeyedReferences.encoder references.internal )
        , ( "external", JE.object <| encodeExternalsDict references.external )
        ]


decoder : Decoder References
decoder =
    JD.map2 References
        (JD.field "internal" Types.KeyedReferences.decoder)
        (JD.field "external" decodeExternalsDict)


addInternal : Reference -> References -> References
addInternal reference references =
    { references | internal = Dict.insertDedupe Types.Reference.listUpdate reference.name [ reference ] references.internal }


addExternal : ModuleName -> Reference -> References -> References
addExternal moduleName reference references =
    { references | external = Dict.insertDedupe Types.KeyedReferences.update moduleName (Dict.singleton reference.name [ reference ]) references.external }


encodeExternalsDict : Dict ModuleName KeyedReferences -> List ( String, Value )
encodeExternalsDict externals =
    Dict.toList externals
        |> List.map (Tuple.mapFirst Util.ModuleName.toHashed)
        |> List.map (Tuple.mapSecond Types.KeyedReferences.encoder)


decodeExternalsDict : Decoder (Dict ModuleName KeyedReferences)
decodeExternalsDict =
    JD.map toDictionary tupleListDecoder


tupleListDecoder : Decoder (List ( String, List ( String, List Reference ) ))
tupleListDecoder =
    JD.keyValuePairs <| JD.keyValuePairs Types.Reference.listDecoder


toDictionary : List ( String, List ( String, List Reference ) ) -> Dict ModuleName KeyedReferences
toDictionary dictList =
    List.foldl addEntry Dict.empty dictList


addEntry : ( String, List ( String, List Reference ) ) -> Dict ModuleName KeyedReferences -> Dict ModuleName KeyedReferences
addEntry ( key, keyedReferences ) dict =
    Dict.insert (Util.ModuleName.fromHashed key) (Types.KeyedReferences.toDictionary keyedReferences) dict
