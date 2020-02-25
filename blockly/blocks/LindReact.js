var waitPersonJSON ={
  "message0": 'wait for a person to get within %1 metres and then: ',
  "args0": [
    {
      "type": "field_number",
      "name": "distance",
      "min": 1,
      "max": 5
    }
  ],
  "message1": '(is this the simulator? %1)',
  "args1": [
    {
      "type": "field_checkbox",
      "name":"simulator",
      "checked": true
    },
  ],
  "nextStatement": null,
  "previousStatement": null,
  "colour": "#FF7E47",
  "tooltip": "waits for a person to get within distance before "
};

Blockly.Blocks['waitPerson'] = {
  init: function() {
    this.jsonInit(waitPersonJSON);
  }
};

var waitTimeJSON ={
  "message0": 'wait for %1 seconds and and then: ',
  "args0": [
    {
      "type": "field_number",
      "name": "distance",
      "min": 1,
      "max": 5
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "colour": "#FF7E47",
  "tooltip": "waits for an amount of seconds"
};

Blockly.Blocks['pause'] = {
  init: function() {
    this.jsonInit(waitTimeJSON);
  }
};

var askOQuestionJSON ={
  "message0": 'Prompt for dialogue: %1',
  "args0": [
    {
      "type": "field_input",
      "name": "prompt",
      "check":"String"
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"procedure_blocks",
  "tooltip": "waits for a person to get within distance before "
};

Blockly.Blocks['askOQuestion'] = {
  init: function() {
    this.jsonInit(askOQuestionJSON);
  }
};

var startJSON ={
  "message0": 'Attach Blocks here',
  "nextStatement": null,
  "Hat": true,
  "colour": "#4C7D4C",
  "tooltip": "start here"
}

Blockly.Blocks['start'] = {
  init: function(){
    this.jsonInit(startJSON);
  }
}
