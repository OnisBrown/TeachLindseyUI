# TeachLindseyUI
## Intro
An interface for creating custom tours of the collection museum using the Lindsey robot

This project aims to establish accessible ways to create robot behaviors on a highly abstracted level

## Installation
### Setting up the blockly page
download the repo to your local/remote server. In the repo root run `sudo git submodule init` and `sudo git submodule update --init --recursive` then `git checkout test` inside roswebcomponents. This will pull the roswebcomponents repo which handles various topic publications and listeners.

Once the repo is cloned and roswebcomponents updated the system will need to be hosted on a server.
The easiest way to do this will be to run a server through [Apache](https://www.apache.org/dist/), [Python](https://www.python.org/downloads/) or [PHP](https://www.php.net/downloads.php).

For PHP and Python run the commands `python3 -m http.server 8000 --bind 127.0.0.1`(python 3), `python -m SimpleHTTPServer 8000`(python 2), or `sudo php -S 127.0.0.1:80` from the root of the repository (where the this readme is). In order to connect to a Scitos G5 or the simulation you will need the web socket address of the chosen platform (`127.0.0.1:9090` for locally running simulation.) with the port always being `9090`. the IP can be configured in `rwc-config.json` and within `/roswebcopmponents/scripts/rwc.js`.

Once the IP addresses are set and the server is running blockly should be ready to use.

### dependancies for museum content based blocks ( the blocks are purple at the moment)
For stock descriptions and blocks based on museum content functions there needs to be a symlink to `lindimp/lindimp_museum_content/config/exhibitors_definition.json`

###
