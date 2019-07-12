Blockly.Blocks['Location'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Exibit %1',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "location",
          "options": [
            ["Viking ship", "Boat"],
            ["Roman Currency", "coins"],
            ["Ancient clay Bowls", "bowls"]
          ]
        }
      ],
      "colour": 160,
      "tooltip": "Pick a location from the drop down menu",
    });
  }
};

Blockly.Blocks['GoTo'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Exibit %1',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "location",
          "options": [
            ["Viking ship", "Boat"],
            ["Roman Currency", "coins"],
            ["Ancient clay Bowls", "bowls"]
          ]
        }
      ],
      "colour": 160,
      "tooltip": "Pick a location from the drop down menu",
    });
  }
};
