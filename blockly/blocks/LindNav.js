var goToJSON ={
      "message0": 'Go to %1',
      "args0": [
        {
          "type": "input_value",
          "name": "exhibit",
          "check": "String"
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "Insert a Location Block"
};

Blockly.Blocks['goTo'] = {
  init: function() {
    this.jsonInit(goToJSON);
  }
};

goToDescribeWhileJSON = {
      "message0": 'Go to %1 and give the standard talk',
      "args0": [
        {
          "type": "input_value",
          "name": "exhibit",
          "check": "String"
        }
      ],
      "message1": 'While going to exhibit do %1',
      "args1": [
        {"type": "input_statement", "name": "DO"}
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "Insert an exhibitLs Block to get the premade talk on that exhibit",
    };

Blockly.Blocks['goToDescribeWhile'] = {
  init: function() {
    this.jsonInit(goToDescribeWhileJSON);
  }
};

goToDescribeJSON = {
      "message0": 'Go to %1 and give the standard talk',
      "args0": [
        {
          "type": "input_value",
          "name": "exhibit",
          "check": "String"
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "Insert an exhibitLs Block to get the premade talk on that exhibit",
    };

Blockly.Blocks['goToDescribe'] = {
  init: function() {
    this.jsonInit(goToDescribeJSON);
  }
};

moveJSON = {
  "message0": 'move x: %1 y: %2 z: %3 metres',
  "args0": [
    {
      "type": "field_number",
      "name": "x",
      "min": -10,
      "max": 10
    },
    {
      "type": "field_number",
      "name": "y",
      "min": -10,
      "max": 10
    },
    {
      "type": "field_number",
      "name": "z",
      "min": -10,
      "max": 10
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"logic_blocks",
  "tooltip": "move Lindsey x, y, z metres +- 10 metre per move",
};

Blockly.Blocks['move'] = {
  init: function() {
    this.jsonInit(moveJSON);
  }
};

exhibitLsJSON = {
  "message0": 'exhibit: %1',
  "args0": [
    {
      "type": "field_dropdown",
      "name": "exhibit",
      "options": [
        ["Bronze age barrow finds", "1.1"],
        ["Gaius Valerius tombstone", "1.2"],
        ["Claudia Crysis tombstone", "1.3"],
        ["Reconstructed Early Medieval face", "1.4"],
        ["Anglo-Scandinavian grave cover", "1.5"],
        ["Medieval stone effigy", "1.6"],
        ["Welton le Wold handaxes", "2.1"],
        ["Neolithic polished axes", "2.2"],
        ["Iron Age logboat", "2.3"],
        ["Tattershall Thorpe grave assemblage", "2.4"],
        ["Medieval cooking", "2.5"],
        ["Fiskerton causeway", "3.1"],
        ["Statuettes of Minerva", "3.2"],
        ["Papal seal matrix", "3.3"],
        ["Jewish face roof tile", "3.4"],
        ["Witham Valley monasteries", "3.5"],
        ["Bronze Age pot decoration", "4.1"],
        ["Iron Age coins drill", "4.2"],
        ["Early Medieval pendant", "4.3"],
        ["Hanging Bowls", "4.4"],
        ["Medieval alabaster", "4.5"]
      ]
    }
  ],
  "output": "String",
  "style":"procedure_blocks",
  "tooltip": "Pick an exhibit from the drop down menu",
};

Blockly.Blocks['exhibitLs'] = {
  init: function() {
    this.jsonInit(exhibitLsJSON);
  }
};

startTourJSON = {
  "message0": 'choose a stock tour: %1',
  "args0": [
    {
      "type": "field_dropdown",
      "name": "tour",
      "options": [
        ["Death and Burial tour", "death"],
        ["Tools and technology tour", "tools"],
        ["Religion and belief tour", "religion"],
        ["Art and design tour", "art"]
      ]
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"procedure_blocks",
  "tooltip": "Pick a tour from one of the pre-established ones",
};

Blockly.Blocks['startTour'] = {
  init: function() {
    this.jsonInit(startTourJSON);
  }
};
