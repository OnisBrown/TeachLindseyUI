Blockly.Blocks['Location'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 Exibit',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "location",
          "options": [
            ["Viking ship", "boat"],
            ["Roman Currency", "coins"],
            ["Ancient clay Bowls", "bowls"]
          ]
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick a location from the drop down menu",
    });
  }
};



Blockly.Blocks['GoTo'] = {
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
