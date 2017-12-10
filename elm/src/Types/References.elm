module Types.References exposing (References, addExternal, addInternal, decoder, default, encoder)

import Dict exposing (Dict)
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder, field, map2)
import Json.Encode as JE exposing (Value, object)
import Types.Reference exposing (Reference)


type alias References =
    { internal : List Reference
    , external : Dict ModuleName (List Reference)
    }


default : References
default =
    { internal = [], external = Dict.empty }


encoder : References -> Value
encoder references =
    object
        [ ( "internal", JE.list (List.map Types.Reference.encoder references.internal) )
        , ( "external", object (encodeExternalsDict references.external) )
        ]


encodeExternalsDict : Dict ModuleName (List Reference) -> List ( String, Value )
encodeExternalsDict externals =
    Dict.toList externals
        |> List.map (Tuple.mapFirst encodeModuleName)
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


encodeModuleName : ModuleName -> String
encodeModuleName moduleName =
    String.join "|" moduleName


decoder : Decoder References
decoder =
    map2 References
        (field "internal" <| JD.list Types.Reference.decoder)
        (field "external" decodeExternalsDict)


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
    Dict.insert (String.split "|" encodedModuleName) references dict


addInternal : Reference -> References -> References
addInternal reference references =
    { references | internal = reference :: references.internal }


addExternal : ModuleName -> Reference -> References -> References
addExternal moduleName reference references =
    { references | external = Dict.update moduleName (externalReferenceUpdate reference) references.external }


externalReferenceUpdate : Reference -> Maybe (List Reference) -> Maybe (List Reference)
externalReferenceUpdate reference maybeReferences =
    case maybeReferences of
        Just references ->
            Just (reference :: references)

        Nothing ->
            Nothing
