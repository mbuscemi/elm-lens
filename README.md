# Elm Lens
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

### The Basics

Elm Lens add contextual markup to all functions, types, and and type aliases in all Elm files in your project.

Exposed expressions are marked up as **exposed**, while non-exposed expressions are marked up as **local**. Reference
counts are also displayed.

Elm Lens runs parallel background processes in order to gather its data, so you aren't blocked from working on your project
while Elm Lens does its work.

### The Reference Panel

![The Reference Panel](https://raw.githubusercontent.com/mbuscemi/elm-lens/master/images/reference-panel.png?raw=true)

Clicking on the "n internal references" or "n external references" markup for a function will display a detailed list of all
associated references in the reference panel. You can then click on a reference in the reference panel to navigate to the
document and location of that reference.

Clicking the same markup element a second time will close the reference panel. (Of course, the reference panel can also be
closed with the standard Atom interface elements.)

### Unused Local Functions

![Unused Exposed Function Warning](https://raw.githubusercontent.com/mbuscemi/elm-lens/master/images/local-no-references-warning.png?raw=true)

If a local function does not have any references in its file, Elm Lens highlights the internal references field
bright red and displays a warning icon. You can clear the warning by using the function, or by simply deleting it.

### Unused Exposed Functions

![Unused Exposed Function Warning](https://raw.githubusercontent.com/mbuscemi/elm-lens/master/images/exposed-no-references-warning.png?raw=true)

If an exposed function has no references in any Elm file in the current active project, Elm Lens turns the
external references field red and displays a warning icon. You can clear the warning by removing the function from the
module's `exposing` declaration, by referencing it in another module, or by deleting it.

### Platform.Program

![Program Function Meta Tag](https://raw.githubusercontent.com/mbuscemi/elm-lens/master/images/program-function-tag.png?raw=true)

Elm applications following 'The Elm Architecture' will, by definition, contain one exposed function that is not referenced
by another module in the system. That function is usually called `main` and its signature will be `Program flags model message`.
Any function whose signature begins with `Program` will be marked by Elm Lens as an "Elm Application Entry Point" and no
reference data will be shown.

### Elm Tests

![Elm Test](https://raw.githubusercontent.com/mbuscemi/elm-lens/master/images/elm-test.png?raw=true)

Tests written for use with [Elm Test](https://github.com/elm-community/elm-test) will also be exposed and
unreferenced in other modules. Such functions are typically executed by a command line utility like
[Node Test Runner](https://github.com/rtfeldman/node-test-runner), or in Atom with
[Elm Test Runner](https://github.com/mbuscemi/elm-test-runner). Elm Lens will hide reference information and show a special
tag for any function with a type signature of `Test`.

## Roadmap

* 0.7.0 Editor Dependency Abstraction
* 0.6.0 Exposed/Local Upgrades
  * Clicking on "exposed/local" toggles the function between being exposed and local.
  * Add a menu option "Auto-Adjust Exports..." which updates all exposings to correspond to whether or not the function is used externally.
* 0.5.0 Differentiate Test References
* 0.4.0 Handle Zero-Reference Exposed Functions in `exposed-modules`
  * Functions that are exposed and unreferenced in modules listed in `exposed-modules` should be handled differently.
* 0.3.0 Configurability Upgrade
  * Will be able to toggle off parts of the metadata or entire metadata via command keys and plugin options.
  * Will be able to configure markup text opacity.
* 0.2.0 Visualization of References
* ~0.1.0 Initial Release~
