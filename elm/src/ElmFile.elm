module ElmFile exposing (ElmFile, default, fromFile, makeAst)

import Elm.Parser
import Elm.Processing exposing (init, process)
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.File exposing (File)
import ElmFile.Exposings
import ElmFile.Imports
import ElmFile.ModuleName
import ElmFile.References
import ElmFile.TopLevelExpressions
import Types.Exposings exposing (Exposings)
import Types.Imports exposing (Imports)
import Types.References exposing (References)
import Types.TopLevelExpressions exposing (TopLevelExpressions)
import Util.File


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


makeAst : String -> String -> File
makeAst fileName fileText =
    case Elm.Parser.parse fileText of
        Ok rawFile ->
            process init rawFile

        Err stringList ->
            Util.File.default


fromFile : String -> File -> ElmFile
fromFile fileName file =
    let
        imports =
            ElmFile.Imports.fromFile file

        topLevelExpressions =
            ElmFile.TopLevelExpressions.fromFile file
    in
    { moduleName = ElmFile.ModuleName.fromFile file
    , imports = imports
    , topLevelExpressions = topLevelExpressions
    , exposings = ElmFile.Exposings.fromFile topLevelExpressions file
    , references = ElmFile.References.fromFile fileName imports file
    }
