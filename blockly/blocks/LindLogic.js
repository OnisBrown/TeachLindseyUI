var listCondXJSON ={
  "message0": 'check for %1',
  "args0": [
    {
      "type": "field_dropdown",
      "name": "check",
      "options": [
        [ "metres of object from Lindsey", "metres" ],
        [ "number of objects", "number" ]
      ]
    }
  ],
  "message1": '%1 %2 %3',
  "args1": [
    {
      "type": "field_dropdown",
      "name": "target",
      "options": [
        [ "person", "person" ],
        [ "exhibits", "exhibits" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "comparitor",
      "options": [
        [ "less than", "<" ],
        [ "greater than", ">" ]
      ]
    },
    {
      "type": "field_number",
      "name": "limit",
    }
  ],
  "output": "String",
  "style":"procedure_blocks",
  "tooltip": "choose your conditions"
};

Blockly.Blocks['listCond'] = {
  init: function() {
    this.jsonInit(listCondXJSON);
  }
};
