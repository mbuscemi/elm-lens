module Types.Imports exposing (Imports, addEntry, decoder, default, encoder, moduleNameForEntry)

import Dict exposing (Dict)
import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Util.ModuleName


type alias Imports =
    Dict String ModuleName


default : Imports
default =
    Dict.empty


encoder : Imports -> Value
encoder imports =
    Dict.toList imports
        |> List.map (Tuple.mapSecond Util.ModuleName.encoder)
        |> JE.object


decoder : Decoder Imports
decoder =
    JD.map toDictionary (JD.keyValuePairs Util.ModuleName.decoder)


toDictionary : List ( String, ModuleName ) -> Imports
toDictionary pairs =
    List.foldl addEntry Dict.empty pairs


addEntry : ( String, ModuleName ) -> Imports -> Imports
addEntry ( funcName, moduleName ) imports =
    Dict.insert funcName moduleName imports


moduleNameForEntry : String -> Imports -> Maybe ModuleName
moduleNameForEntry name imports =
    Dict.get name imports
