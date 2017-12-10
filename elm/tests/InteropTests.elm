module InteropTests exposing (exposings)

import Expect exposing (Expectation)
import Json.Decode exposing (decodeValue)
import Set
import Test exposing (Test, describe, test)
import Types.Exposings exposing (Exposings)


exposings : Test
exposings =
    describe "Exposings" <|
        [ test "can encode and decode" <|
            \_ ->
                let
                    orig =
                        Exposings
                            (Set.singleton "a")
                            (Set.singleton "b")

                    encoded =
                        Types.Exposings.encoder orig

                    decoded =
                        decodeValue Types.Exposings.decoder encoded
                            |> Result.withDefault Types.Exposings.default
                in
                Expect.equal decoded orig
        ]
