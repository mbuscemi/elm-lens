module ElmFile exposing (ElmFile, default, fromString)

import Elm.Parser
import Elm.Processing exposing (init, process)
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.File exposing (File)
import Model.Exposings
import Model.Imports
import Model.ModuleName
import Model.References
import Model.TopLevelExpressions
import Types.Exposings exposing (Exposings)
import Types.Imports exposing (Imports)
import Types.References exposing (References)
import Types.TopLevelExpressions exposing (TopLevelExpressions)


type alias ElmFile =
    { moduleName : ModuleName
    , imports : Imports
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : References
    }


default : ElmFile
default =
    { moduleName = []
    , imports = Types.Imports.default
    , topLevelExpressions = Types.TopLevelExpressions.default
    , exposings = Types.Exposings.default
    , references = Types.References.default
    }


fromString : String -> String -> ElmFile
fromString fileName fileText =
    Elm.Parser.parse fileText
        |> make


make : Result (List String) RawFile -> ElmFile
make result =
    case result of
        Ok rawFile ->
            process init rawFile
                |> fromFile

        Err stringList ->
            default


fromFile : File -> ElmFile
fromFile file =
    let
        imports =
            Model.Imports.fromFile file

        topLevelExpressions =
            Model.TopLevelExpressions.fromFile file
    in
    { moduleName = Model.ModuleName.fromFile file
    , imports = imports
    , topLevelExpressions = topLevelExpressions
    , exposings = Model.Exposings.fromFile topLevelExpressions file
    , references = Model.References.fromFile imports file
    }
