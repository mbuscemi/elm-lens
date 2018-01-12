module FileMarkup.AliasedExternalReference exposing (canFindAliasedExternalReference)

import Dict
import ElmFile
import Expect
import Model.FileMarkup
import Model.ProjectFileData
import Model.Report
import Set
import Test exposing (Test, describe, test)
import Types.ProjectFileData
import Types.Reference


canFindAliasedExternalReference : Test
canFindAliasedExternalReference =
    describe "Aliased External Reference" <|
        let
            elmFileA =
                ElmFile.fromString "ModuleA.elm" fileA

            elmFileB =
                ElmFile.fromString "ModuleB.elm" fileB

            reportA =
                Model.Report.make "ModuleA.elm" elmFileA

            reportB =
                Model.Report.make "ModuleB.elm" elmFileB

            model1 =
                { projectFileData = Types.ProjectFileData.default
                , lastUpdatedFile = Nothing
                , fileBeingReprocessed = Nothing
                }
                    |> Model.ProjectFileData.add reportB
                    |> Model.ProjectFileData.add reportA

            moduleAFileMarkup =
                { projectFileData = model1.projectFileData
                , projectFileRegistry = Set.fromList [ "ModuleA.elm", "ModuleB.elm" ]
                , fileBeingReprocessed = Nothing
                }
                    |> Model.FileMarkup.make "ModuleA.elm"
        in
        [ test "parsed ModuleB has expected references" <|
            \_ ->
                Expect.equal elmFileB.references
                    { internal =
                        Dict.empty
                            |> Dict.insert "String" [ Types.Reference.make "String" 4 10 4 16 "ModuleB.elm" ]
                            |> Dict.insert "toString" [ Types.Reference.make "toString" 6 4 6 12 "ModuleB.elm" ]
                    , external =
                        Dict.empty
                            |> Dict.insert [ "ModuleA" ]
                                (Dict.empty
                                    |> Dict.insert "blarg" [ Types.Reference.make "blarg" 6 13 6 21 "ModuleB.elm" ]
                                )
                    }
        , test "file markup for ModuleA contains one external reference for blarg" <|
            \_ ->
                Expect.equal moduleAFileMarkup.expressions
                    [ { name = "blarg"
                      , lineNumber = 2
                      , isExposed = True
                      , numInternalRefs = 0
                      , numExternalRefs = 1
                      , specialType = "None"
                      }
                    ]
        ]


fileA : String
fileA =
    """module ModuleA exposing (blarg)

blarg : Int
blarg =
    10
"""


fileB : String
fileB =
    """module ModuleB exposing (frangle)

import ModuleA as MA

frangle : String
frangle =
    toString MA.blarg
"""
