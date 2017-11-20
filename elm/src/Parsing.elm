module Parsing exposing (isAlphaOrDot, lowerCaseVariable, singleString, spaces, takeLowerInitialSingleString, upperCaseVariable)

import Char
import Parser exposing ((|.), (|=), Count(Exactly), Parser, andThen, keep, oneOrMore, succeed, zeroOrMore)
import Parser.LanguageKit exposing (variable)
import Set exposing (Set)


singleString : Parser String
singleString =
    keep oneOrMore isAlpha


takeLowerInitialSingleString : Parser String
takeLowerInitialSingleString =
    succeed (++)
        |= singleLowerCaseLetter
        |= singleString


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


spaces : Parser String
spaces =
    keep zeroOrMore isSpace


isAlphaOrDot : Char -> Bool
isAlphaOrDot char =
    isAlpha char || isDot char


singleUpperCaseLetter : Parser String
singleUpperCaseLetter =
    keep (Exactly 1) Char.isUpper


singleLowerCaseLetter : Parser String
singleLowerCaseLetter =
    keep (Exactly 1) Char.isLower


isAlpha : Char -> Bool
isAlpha char =
    Char.isUpper char || Char.isLower char


isDot : Char -> Bool
isDot char =
    char == '.'


isSpace : Char -> Bool
isSpace char =
    char == ' '
