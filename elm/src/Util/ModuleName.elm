module Util.ModuleName exposing (decoder, encoder, fromHashed, toHashed)

import Elm.Syntax.Base exposing (ModuleName)
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)


encoder : ModuleName -> Value
encoder moduleName =
    List.map JE.string moduleName
        |> JE.list


decoder : Decoder ModuleName
decoder =
    JD.list JD.string


toHashed : ModuleName -> String
toHashed moduleName =
    String.join "|" moduleName


fromHashed : String -> ModuleName
fromHashed encodedModuleName =
    String.split "|" encodedModuleName
