module Main where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

myTypes :: String
myTypes = "instance of myTypes"

concat :: String -> String -> String
concat "" b = b
concat a "" = a
concat "testing" _ = "doesn't matter, I'm testing"
concat a b = a <> ", " <> b

main :: forall e. Eff (console :: CONSOLE | e) Unit
main = do
  log (
    concat
      "empty second"
      (concat "a" "b")
    )
