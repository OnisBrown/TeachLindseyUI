# TeachLindseyUI
## Intro
An interface for creating custom tours of the collection museum using the Lindsey robot

This project aims to establish accessible ways to create robot behaviors on a highly abstracted level. A report on the initial study can be found here (https://dl.acm.org/doi/abs/10.1145/3371382.3378271).

## Installation
### Setting up the blockly page
download the repo to your local/remote server. In the repo root run `sudo git submodule init` and `sudo git submodule update --init --recursive` then `git checkout test` inside roswebcomponents. This will pull the roswebcomponents repo which handles various topic publications and listeners.

In order to connect to a Scitos G5 or the simulation you will need the web socket address of the chosen platform (`127.0.0.1:9090` for locally running simulation.) with the port always being `9090`. the IP can be configured in `rwc-config.json` and within `/roswebcopmponents/scripts/rwc.js`.

Once the IP addresses are set and the server is running blockly should be ready to use.

### dependancies for museum content based blocks (these blocks are purple at the moment)
For stock descriptions and blocks based on museum content functions there needs to be a symlink to `lindimp/lindimp_museum_content/config/exhibitors_definition.json`
