Blockly.Blocks['GoTo'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Go To %1',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "location",
          "options": [
            ["Viking ship", "Boat"],
            ["Roman Currency", "coins"]
          ]
        }
      ],
      "colour": 160,
      "tooltip": "Pick a location from the drop down menu",
    });
  }
};
