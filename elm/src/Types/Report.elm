module Types.Report exposing (Report, decoder, default, encoder, fromValue)

import Json.Decode as JD exposing (Decoder, Value, decodeValue, field, list, map5, string)
import Json.Encode as JE exposing (list, object, string)
import Types.Exposings exposing (Exposings)
import Types.Reference exposing (Reference)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Report =
    { fileName : String
    , moduleName : List String
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : List Reference
    }


default : Report
default =
    { fileName = ""
    , moduleName = []
    , topLevelExpressions = Types.TopLevelExpressions.default
    , exposings = Types.Exposings.default
    , references = []
    }


fromValue : Value -> Report
fromValue value =
    decodeValue decoder value |> Result.withDefault default


encoder : Report -> Value
encoder report =
    object
        [ ( "fileName", JE.string report.fileName )
        , ( "moduleName", JE.list <| List.map JE.string report.moduleName )
        , ( "topLevelExpressions", Types.TopLevelExpressions.encoder report.topLevelExpressions )
        , ( "exposings", Types.Exposings.encoder report.exposings )
        , ( "references", JE.list <| List.map Types.Reference.encoder report.references )
        ]


decoder : Decoder Report
decoder =
    map5 Report
        (field "fileName" JD.string)
        (field "moduleName" (JD.list JD.string))
        (field "topLevelExpressions" Types.TopLevelExpressions.decoder)
        (field "exposings" Types.Exposings.decoder)
        (field "references" (JD.list Types.Reference.decoder))
