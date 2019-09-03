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
      "tooltip": "Insert a scrypt",
    });
  }
};

Blockly.Blocks['describe'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Give a standard talk on %1',
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
    });
  }
};

Blockly.Blocks['askYNQuestion'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Ask a question %1',
      "args0": [
        {
          "type": "field_input",
          "name": "question",
          "check": "String"
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"logic_blocks",
      "tooltip": "type a question to ask",
    });
  }
};
