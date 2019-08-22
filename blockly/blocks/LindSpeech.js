Blockly.Blocks['script'] = {
  init: function() {
    this.jsonInit({
      "message0": 'place speech here %1',
      "args0": [
        {
          "type": "field_input",
          "name": "script",
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "Pick a location from the drop down menu",
    });
  }
};


Blockly.Blocks['giveSpeech'] = {
  init: function() {
    this.jsonInit({
      "message0": 'say %1',
      "args0": [
        {
          "type": "input_value",
          "name": "script",
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
