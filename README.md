# TeachLindseyUI
## Intro
An interface for creating custom tours of the collection museum using the Lindsey robot

This project aims to establish accessible ways to create robot behaviours on a highly abstracted level

## Installation
### Setting up the blockly page
download the repo to your local/remote server.

In the repo root run `sudo git submodule init` and `sudo git submodule --recursive --remote`. This will pull the roswebcomponents repo which handles various topic publications and listneners
### dependancies for museum content based blocks ( the blocks are purple at the moment)

For stock descriptions and blaocks based on museum content functions there needs to be a symlink to lindimp/lindimp_museum_content/config/exhibitors_definition.json
