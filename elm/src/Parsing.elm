module Parsing exposing (isAlphaOrDot, lowerInitialSingleString, singleString, spaces)

import Char
import Parser exposing ((|.), (|=), Count(Exactly), Parser, andThen, keep, oneOrMore, succeed, zeroOrMore)


singleString : Parser String
singleString =
    keep oneOrMore isAlpha


lowerInitialSingleString : Parser String
lowerInitialSingleString =
    succeed (++)
        |= singleLowerCaseLetter
        |= singleString


spaces : Parser String
spaces =
    keep zeroOrMore (\c -> c == ' ')


isAlphaOrDot : Char -> Bool
isAlphaOrDot char =
    isAlpha char || isDot char


isAlpha : Char -> Bool
isAlpha char =
    Char.isUpper char || Char.isLower char


isDot : Char -> Bool
isDot char =
    char == '.'


singleLowerCaseLetter : Parser String
singleLowerCaseLetter =
    keep (Exactly 1) Char.isLower
