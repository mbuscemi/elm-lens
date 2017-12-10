module Types.Report exposing (Report, decoder, default, encoder, fromValue)

import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Types.Exposings exposing (Exposings)
import Types.References exposing (References)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias Report =
    { fileName : String
    , moduleName : List String
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : References
    }


default : Report
default =
    { fileName = ""
    , moduleName = []
    , topLevelExpressions = Types.TopLevelExpressions.default
    , exposings = Types.Exposings.default
    , references = Types.References.default
    }


fromValue : Value -> Report
fromValue value =
    JD.decodeValue decoder value |> Result.withDefault default


encoder : Report -> Value
encoder report =
    JE.object
        [ ( "fileName", JE.string report.fileName )
        , ( "moduleName", JE.list <| List.map JE.string report.moduleName )
        , ( "topLevelExpressions", Types.TopLevelExpressions.encoder report.topLevelExpressions )
        , ( "exposings", Types.Exposings.encoder report.exposings )
        , ( "references", Types.References.encoder report.references )
        ]


decoder : Decoder Report
decoder =
    JD.map5 Report
        (JD.field "fileName" JD.string)
        (JD.field "moduleName" (JD.list JD.string))
        (JD.field "topLevelExpressions" Types.TopLevelExpressions.decoder)
        (JD.field "exposings" Types.Exposings.decoder)
        (JD.field "references" Types.References.decoder)
