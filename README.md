# elm-lens
[![Build Status](https://travis-ci.org/mbuscemi/elm-lens.svg?branch=master)](https://travis-ci.org/mbuscemi/elm-lens)

Elm code visualizations for maximum productivity

![Elm Lens](https://raw.githubusercontent.com/mbuscemi/elm-lens/master/images/example.gif?raw=true)

## Setup

1. Install `elm-lens` in Atom.
    1. In Atom, go to Atom → Preferences...
    2. Click "Install".
    3. Search for "elm-lens".
    4. Find "elm-lens" in the list and click the "install" button.

## Feature Overview

Elm Lens add contextual markup to all functions, types, and and type aliases in all Elm files in your project.

Exposed expressions are marked up as **exposed**, while non-exposed expressions are marked up as **local**. Reference counts are also displayed.

Elm Lens runs parallel background processes in order to gather its data, so you aren't blocked from working on your project while Elm Lens does its work.
