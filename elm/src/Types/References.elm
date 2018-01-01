module Types.References exposing (References, addExternal, addInternal, decoder, default, encoder)

import Dict exposing (Dict)
import Dict.Extra as Dict
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.Reference exposing (Reference)
import Util.ModuleName


type alias References =
    { internal : List Reference
    , external : Dict ModuleName (List Reference)
    }


default : References
default =
    { internal = []
    , external = Dict.empty
    }


encoder : References -> Value
encoder references =
    JE.object
        [ ( "internal", JE.list (List.map Types.Reference.encoder references.internal) )
        , ( "external", JE.object (encodeExternalsDict references.external) )
        ]


encodeExternalsDict : Dict ModuleName (List Reference) -> List ( String, Value )
encodeExternalsDict externals =
    Dict.toList externals
        |> List.map (Tuple.mapFirst Util.ModuleName.toHashed)
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


decoder : Decoder References
decoder =
    JD.map2 References
        (JD.field "internal" <| JD.list Types.Reference.decoder)
        (JD.field "external" decodeExternalsDict)


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
addEntry ( encodedModuleName, references ) dict =
    Dict.insert (Util.ModuleName.fromHashed encodedModuleName) references dict


addInternal : Reference -> References -> References
addInternal reference references =
    { references | internal = reference :: references.internal }


addExternal : ModuleName -> Reference -> References -> References
addExternal moduleName reference references =
    { references | external = Dict.insertDedupe externalReferenceUpdate moduleName [ reference ] references.external }


externalReferenceUpdate : List Reference -> List Reference -> List Reference
externalReferenceUpdate referencesA referencesB =
    let
        newReference =
            List.head referencesB
    in
    case newReference of
        Just reference ->
            reference :: referencesA

        Nothing ->
            referencesB
