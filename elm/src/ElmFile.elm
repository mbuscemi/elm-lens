module ElmFile exposing (ElmFile, createBase, default, makeAst, parseCore, parseReferences)

import Elm.Parser
import Elm.Processing exposing (init, process)
import Elm.Syntax.Base exposing (ModuleName)
import Elm.Syntax.File exposing (File)
import ElmFile.Exposings
import ElmFile.Imports
import ElmFile.ModuleName
import ElmFile.ProjectPath
import ElmFile.References
import ElmFile.TopLevelExpressions
import Types.Exposings exposing (Exposings)
import Types.Imports exposing (Imports)
import Types.ProjectPath exposing (ProjectPath)
import Types.References exposing (References)
import Types.TopLevelExpressions exposing (TopLevelExpressions)
import Util.File


type alias ElmFile =
    { moduleName : ModuleName
    , projectPath : ProjectPath
    , imports : Imports
    , topLevelExpressions : TopLevelExpressions
    , exposings : Exposings
    , references : References
    }


default : ElmFile
default =
    { moduleName = []
    , projectPath = Types.ProjectPath.default
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


createBase : String -> File -> ElmFile
createBase fileName file =
    { default
        | moduleName = ElmFile.ModuleName.fromFile file
        , topLevelExpressions = ElmFile.TopLevelExpressions.fromFile file
    }


parseCore : String -> File -> ElmFile -> ElmFile
parseCore fileName file elmFile =
    { elmFile
        | projectPath = ElmFile.ProjectPath.determine fileName elmFile.moduleName
        , imports = ElmFile.Imports.fromFile file
        , exposings = ElmFile.Exposings.fromFile elmFile.topLevelExpressions file
    }


parseReferences : String -> File -> ElmFile -> ElmFile
parseReferences fileName file elmFile =
    { elmFile | references = ElmFile.References.fromFile fileName elmFile.imports file }
