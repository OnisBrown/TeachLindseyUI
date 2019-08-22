Blockly.Blocks['goTo'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Go to %1',
      "args0": [
        {
          "type": "input_value",
          "name": "location",
          "check": "String"
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "colour": 160,
      "tooltip": "Insert a Location Block",
    });
  }
};

Blockly.Blocks['goToDescribe'] = {
  init: function() {
    this.jsonInit({
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
      "colour": 160,
      "tooltip": "Insert an exhibitLs Block to get the premade talk on that exhibit",
    });
  }
};

Blockly.Blocks['move'] = {
  init: function() {
    this.jsonInit({
      "message0": 'move x: %1 y: %2 z: %3 units',
      "args0": [
        {
          "type": "field_number",
          "name": "x",
          "check": "Number"
        },
        {
          "type": "field_number",
          "name": "y",
          "check": "Number"
        },
        {
          "type": "field_number",
          "name": "z",
          "check": "Number"
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "colour": 160,
      "tooltip": "move Lindsey forward x metres",
    });
  }
};

Blockly.Blocks['location'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 Exhibit',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "location",
          "options": [
            ["Viking ship", "12"],
            ["Roman Currency", "14"],
            ["Ancient clay Bowls", "16"]
          ]
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick a location from the drop down menu",
    });
  }
};

Blockly.Blocks['exhibitLs1'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Death and burial tour exhibit: %1',
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
            ["Medieval stone effigy", "1.6"]
          ]
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick an exhibit from the drop down menu",
    });
  }
};

Blockly.Blocks['exhibitLs2'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Tools and technology exhibit: %1',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "exhibit",
          "options": [
            ["Welton le Wold handaxes", "2.1"],
            ["Neolithic polished axes", "2.2"],
            ["Iron Age logboat", "2.3"],
            ["Tattershall Thorpe grave assemblage", "2.4"],
            ["Medieval cooking", "2.5"]
          ]
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick an exhibit from the drop down menu",
    });
  }
};

Blockly.Blocks['exhibitLs3'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Religion and belief exhibit: %1',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "exhibit",
          "options": [
            ["Fiskerton causeway", "3.1"],
            ["Statuettes of Minerva", "3.2"],
            ["Papal seal matrix", "3.3"],
            ["Jewish face roof tile", "3.4"],
            ["Witham Valley monasteries", "3.5"]
          ]
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick an exhibit from the drop down menu",
    });
  }
};

Blockly.Blocks['exhibitLs4'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Art and design exhibit: %1',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "exhibit",
          "options": [
            ["Bronze Age pot decoration", "4.1"],
            ["Iron Age coins drill", "4.2"],
            ["Early Medieval pendant", "4.3"],
            ["Hanging Bowls", "4.4"],
            ["Medieval alabaster", "4.5"]
          ]
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick an exhibit from the drop down menu",
    });
  }
};
