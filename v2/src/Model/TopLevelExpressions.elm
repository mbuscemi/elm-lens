module Model.TopLevelExpressions exposing (addLineNumbers, collect)

import Ast.Statement exposing (Statement(FunctionDeclaration, TypeAliasDeclaration, TypeDeclaration), Type(TypeConstructor))
import Char
import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser, keyword, oneOf, run, succeed)
import Parser.LanguageKit exposing (variable)
import Set exposing (Set)
import Types.Expression exposing (Expression)
import Types.TopLevelExpressions exposing (TopLevelExpressions, Updater)


type alias Model model =
    { model
        | fileAST : List Statement
        , topLevelExpressions : TopLevelExpressions
    }


collect : Model model -> Model model
collect model =
    { model | topLevelExpressions = List.foldl collectExpressions model.topLevelExpressions model.fileAST }


collectExpressions : Statement -> TopLevelExpressions -> TopLevelExpressions
collectExpressions statement expressions =
    case statement of
        FunctionDeclaration name _ _ ->
            { expressions
                | functions = Dict.insert name Types.Expression.default expressions.functions
            }

        TypeDeclaration (TypeConstructor names _) _ ->
            { expressions
                | types = Dict.insert (firstElement names) Types.Expression.default expressions.types
            }

        TypeAliasDeclaration (TypeConstructor names _) _ ->
            { expressions
                | typeAliases = Dict.insert (firstElement names) Types.Expression.default expressions.typeAliases
            }

        _ ->
            expressions


firstElement : List String -> String
firstElement singleEntry =
    List.head singleEntry
        |> Maybe.withDefault ""


addLineNumbers : String -> Model model -> Model model
addLineNumbers text model =
    List.foldl lineCollector ( model, -1 ) (asLines text)
        |> Tuple.first


asLines : String -> List String
asLines text =
    String.split "\n" text


lineCollector : String -> ( Model model, Int ) -> ( Model model, Int )
lineCollector line ( model, lineNumber ) =
    case run topLevelExpression line of
        Ok (Function name) ->
            collectFor Types.TopLevelExpressions.updateFunctionLineNumber name lineNumber 0 model.topLevelExpressions model

        Ok (TypeAlias name) ->
            collectFor Types.TopLevelExpressions.updateTypeAliasLineNumber name lineNumber 1 model.topLevelExpressions model

        Ok (Type name) ->
            collectFor Types.TopLevelExpressions.updateTypeLineNumber name lineNumber 1 model.topLevelExpressions model

        _ ->
            ( model, lineNumber + 1 )


collectFor : Updater -> String -> Int -> Int -> TopLevelExpressions -> Model model -> ( Model model, Int )
collectFor updater name lineNumber lineNumberMod topLevelExpressions model =
    ( { model | topLevelExpressions = updater name (lineNumber + lineNumberMod) topLevelExpressions }, lineNumber + 1 )


type TopLevelKeyword
    = NoMatch
    | Function String
    | TypeAlias String
    | Type String


topLevelExpression : Parser TopLevelKeyword
topLevelExpression =
    oneOf
        [ succeed NoMatch
            |. keyword "port "
        , succeed NoMatch
            |. keyword "module "
        , succeed NoMatch
            |. keyword "import "
        , succeed TypeAlias
            |. keyword "type alias "
            |= upperCaseVariable
        , succeed Type
            |. keyword "type "
            |= upperCaseVariable
        , succeed Function
            |= lowerCaseVariable
        ]


lowerCaseVariable : Parser String
lowerCaseVariable =
    variable Char.isLower isVarChar keywords


upperCaseVariable : Parser String
upperCaseVariable =
    variable Char.isUpper isVarChar keywords


isVarChar : Char -> Bool
isVarChar char =
    Char.isLower char
        || Char.isUpper char
        || Char.isDigit char
        || (char == '_')


keywords : Set String
keywords =
    Set.fromList [ "let", "in", "case", "of" ]
