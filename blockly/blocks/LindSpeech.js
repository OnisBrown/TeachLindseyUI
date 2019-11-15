scriptJSON = {
  "message0": 'place speech here %1',
  "args0": [
    {
      "type": "field_input",
      "name": "script",
    }
  ],
  "output": "String",
  "colour": 160,
  "tooltip": "Pick a location from the drop down menu"
};

Blockly.Blocks['script'] = {
  init: function() {
    this.jsonInit(scriptJSON);
  }
};

giveSpeechJSON = {
  "message0": 'say %1',
  "args0": [
    {
      "type": "field_input",
      "name": "script",
      "check": "String",
      "TEXT_DEFAULT_HEIGHT": '20px'
    }
  ],
  "message1": 'behaviour toggles: gaze %1 pivoting %2',
  "args1": [
    {
      "type": "field_checkbox",
      "name":"gaze",
      "checked": true
    },
    {
      "type": "field_checkbox",
      "name":"pivot",
      "checked": true
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "colour": 160,
  "tooltip": "Insert a scrypt"
};

Blockly.Blocks['giveSpeech'] = {
  init: function() {
    this.jsonInit(giveSpeechJSON);
  }
};

describeJSON = {
  "message0": 'Give a standard talk on %1',
  "args0": [
    {
      "type": "input_value",
      "name": "exhibit",
      "check": "String"
    },
  ],
  "message1": 'behaviour toggles: gaze %1 pivoting %2',
  "args1": [
    {
      "type": "field_checkbox",
      "name":"gaze",
      "checked": true
    },
    {
      "type": "field_checkbox",
      "name":"pivot",
      "checked": true
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"procedure_blocks",
  "tooltip": "Insert an exhibitLs Block to get the premade talk on that exhibit"
};

Blockly.Blocks['describe'] = {
  init: function() {
    this.jsonInit(describeJSON);
  }
};

askYNQuestionJSON = {
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
  "colour": 160,
  "tooltip": "type a question to ask"
};

Blockly.Blocks['askYNQuestion'] = {
  init: function() {
    this.jsonInit(askYNQuestionJSON);
  }
};
