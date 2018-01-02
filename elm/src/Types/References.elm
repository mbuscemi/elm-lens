module Types.References exposing (References, addExternal, addInternal, decoder, default, encoder)

import Dict exposing (Dict)
import Dict.Extra as Dict
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.Reference exposing (Reference)
import Util.ModuleName


type alias References =
    { internal : Dict String (List Reference)
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
        [ ( "internal", JE.object <| encodeInternalsDict references.internal )
        , ( "external", JE.object <| encodeExternalsDict references.external )
        ]


encodeInternalsDict : Dict String (List Reference) -> List ( String, Value )
encodeInternalsDict internals =
    Dict.toList internals
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


encodeExternalsDict : Dict ModuleName (List Reference) -> List ( String, Value )
encodeExternalsDict externals =
    Dict.toList externals
        |> List.map (Tuple.mapFirst Util.ModuleName.toHashed)
        |> List.map (Tuple.mapSecond Types.Reference.listEncoder)


decoder : Decoder References
decoder =
    JD.map2 References
        (JD.field "internal" decodeInternalsDict)
        (JD.field "external" decodeExternalsDict)


decodeInternalsDict : Decoder (Dict String (List Reference))
decodeInternalsDict =
    JD.map (toDictionary identity) tupleListDecoder


decodeExternalsDict : Decoder (Dict ModuleName (List Reference))
decodeExternalsDict =
    JD.map (toDictionary Util.ModuleName.fromHashed) tupleListDecoder


tupleListDecoder : Decoder (List ( String, List Reference ))
tupleListDecoder =
    JD.keyValuePairs Types.Reference.listDecoder


toDictionary : (String -> comparable) -> List ( String, List Reference ) -> Dict comparable (List Reference)
toDictionary unhash dictList =
    List.foldl (addEntry unhash) Dict.empty dictList


addEntry : (String -> comparable) -> ( String, List Reference ) -> Dict comparable (List Reference) -> Dict comparable (List Reference)
addEntry unhash ( key, references ) dict =
    Dict.insert (unhash key) references dict


addInternal : Reference -> References -> References
addInternal reference references =
    { references | internal = add reference.name reference references.internal }


addExternal : ModuleName -> Reference -> References -> References
addExternal moduleName reference references =
    { references | external = add moduleName reference references.external }


add : comparable -> Reference -> Dict comparable (List Reference) -> Dict comparable (List Reference)
add key reference references =
    Dict.insertDedupe referenceUpdate key [ reference ] references


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
