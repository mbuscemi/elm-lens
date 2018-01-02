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
    , external : Dict ModuleName (List Reference)
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
    { references | internal = Dict.insertDedupe referenceUpdate reference.name [ reference ] references.internal }


addExternal : ModuleName -> Reference -> References -> References
addExternal moduleName reference references =
    { references | external = Dict.insertDedupe referenceUpdate moduleName [ reference ] references.external }


encodeExternalsDict : Dict ModuleName (List Reference) -> List ( String, Value )
encodeExternalsDict externals =
    Dict.toList externals
        |> List.map (Tuple.mapFirst Util.ModuleName.toHashed)
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


decodeExternalsDict : Decoder (Dict ModuleName (List Reference))
decodeExternalsDict =
    JD.map toDictionary tupleListDecoder


tupleListDecoder : Decoder (List ( String, List Reference ))
tupleListDecoder =
    JD.keyValuePairs Types.Reference.listDecoder


toDictionary : List ( String, List Reference ) -> Dict ModuleName (List Reference)
toDictionary dictList =
    List.foldl addEntry Dict.empty dictList


addEntry : ( String, List Reference ) -> Dict ModuleName (List Reference) -> Dict ModuleName (List Reference)
addEntry ( key, references ) dict =
    Dict.insert (Util.ModuleName.fromHashed key) references dict


referenceUpdate : List Reference -> List Reference -> List Reference
referenceUpdate referencesA referencesB =
    let
        newReference =
            List.head referencesB
    in
    case newReference of
        Just reference ->
            reference :: referencesA

        Nothing ->
            referencesB
