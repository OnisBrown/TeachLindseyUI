var forXJSON ={
  "message0": 'for %1 time(s)',
  "args0": [
    {
      "type": "field_number",
      "name": "iterations",
      "min": 1,
      "max": 10
    }
  ],
  "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  "args1": [{
    "type": "input_statement",
    "name": "DO"
  }],
  "nextStatement": null,
  "previousStatement": null,
  "colour": "#00008b",
  "tooltip": "waits for an amount of seconds"
};

Blockly.Blocks['lindFor'] = {
  init: function() {
    this.jsonInit(forXJSON);
  }
};

var whileXJSON ={
  "message0": 'while %1 is %2 %3 do',
  "args0": [
    {
      "type": "input_value",
      "name": "target",
      "min": 1,
      "max": 10
    },
    {
      "type": "field_dropdown",
      "name": "comparitor",
      "options": [
        [ "<", "<" ],
        [ ">", ">" ],
        [ "=", "==" ],
        [ "< or =", "<=" ],
        [ "> or =", ">=" ]
      ]
    },
    {
      "type": "field_number",
      "name": "condition",
    }
  ],
  "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  "args1": [{
    "type": "input_statement",
    "name": "DO"
  }],
  "nextStatement": null,
  "previousStatement": null,
  "colour": "#00008b",
  "tooltip": "waits for an amount of seconds"
};

Blockly.Blocks['lindWhile'] = {
  init: function() {
    this.jsonInit(whileXJSON);
  }
};
