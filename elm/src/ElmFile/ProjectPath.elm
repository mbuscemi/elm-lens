module ElmFile.ProjectPath exposing (determine)

import Elm.Syntax.Base exposing (ModuleName)


determine : String -> ModuleName -> String
determine filePath moduleName =
    List.foldr eliminateModuleName (stripDotElm filePath) moduleName


eliminateModuleName : String -> String -> String
eliminateModuleName modulePiece path =
    String.dropRight (String.length modulePiece + 1) path


stripDotElm : String -> String
stripDotElm path =
    String.dropRight 4 path
