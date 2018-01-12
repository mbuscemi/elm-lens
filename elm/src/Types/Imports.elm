module Types.Imports exposing (Imports, addAlias, addDirect, decoder, default, encoder, moduleNameForDirectEntry, unaliasedModuleName)

import Dict exposing (Dict)
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder)
import Json.Decode.Extra as JD
import Json.Encode as JE exposing (Value)
import Set exposing (Set)
import Util.ModuleName


type alias Imports =
    { direct : Dict String ModuleName
    , aliases : Dict ModuleName ModuleName
    , unqualified : Set ModuleName
    }


default : Imports
default =
    { direct = Dict.empty
    , aliases = Dict.empty
    , unqualified = Set.empty
    }


addDirect : String -> ModuleName -> Imports -> Imports
addDirect funcName moduleName imports =
    { imports | direct = Dict.insert funcName moduleName imports.direct }


addAlias : ModuleName -> ModuleName -> Imports -> Imports
addAlias aliasName realModuleName imports =
    { imports | aliases = Dict.insert aliasName realModuleName imports.aliases }


moduleNameForDirectEntry : String -> Imports -> Maybe ModuleName
moduleNameForDirectEntry name imports =
    Dict.get name imports.direct


unaliasedModuleName : ModuleName -> Imports -> ModuleName
unaliasedModuleName moduleName imports =
    case Dict.get moduleName imports.aliases of
        Just realModuleName ->
            realModuleName

        Nothing ->
            moduleName


encoder : Imports -> Value
encoder imports =
    JE.object
        [ ( "direct", encodeDirect imports.direct )
        , ( "aliases", encodeAliases imports.aliases )
        , ( "unqualified", encodeUnqualified imports.unqualified )
        ]


encodeDirect : Dict String ModuleName -> Value
encodeDirect directImports =
    Dict.toList directImports
        |> List.map (Tuple.mapSecond Util.ModuleName.encoder)
        |> JE.object


encodeAliases : Dict ModuleName ModuleName -> Value
encodeAliases aliasImports =
    Dict.toList aliasImports
        |> List.map (Tuple.mapFirst Util.ModuleName.toHashed)
        |> List.map (Tuple.mapSecond Util.ModuleName.encoder)
        |> JE.object


encodeUnqualified : Set ModuleName -> Value
encodeUnqualified unqualifiedImports =
    Set.toList unqualifiedImports
        |> List.map Util.ModuleName.encoder
        |> JE.list


decoder : Decoder Imports
decoder =
    JD.map3 Imports
        (JD.field "direct" <| JD.map toDirectsDict <| JD.keyValuePairs Util.ModuleName.decoder)
        (JD.field "aliases" <| JD.map toAliasesDict <| JD.keyValuePairs Util.ModuleName.decoder)
        (JD.field "unqualified" <| JD.set <| Util.ModuleName.decoder)


toDirectsDict : List ( String, ModuleName ) -> Dict String ModuleName
toDirectsDict pairs =
    List.foldl addDirectEntry Dict.empty pairs


addDirectEntry : ( String, ModuleName ) -> Dict String ModuleName -> Dict String ModuleName
addDirectEntry ( funcName, moduleName ) directImports =
    Dict.insert funcName moduleName directImports


toAliasesDict : List ( String, ModuleName ) -> Dict ModuleName ModuleName
toAliasesDict pairs =
    List.foldl addAliasEntry Dict.empty pairs


addAliasEntry : ( String, ModuleName ) -> Dict ModuleName ModuleName -> Dict ModuleName ModuleName
addAliasEntry ( encodedAlias, realModuleName ) aliasImports =
    Dict.insert (Util.ModuleName.fromHashed encodedAlias) realModuleName aliasImports
