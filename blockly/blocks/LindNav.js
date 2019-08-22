Blockly.Blocks['location'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 Exibit',
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

Blockly.Blocks['GoToDescribe']
