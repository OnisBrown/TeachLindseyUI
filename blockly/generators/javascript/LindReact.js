var waitPersonJSON ={
      "message0": 'wait for a person to get within %1 metres and then ',
      "args0": [
        {
          "type": "field_number",
          "name": "distance",
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "waits for a person to get within distance before "
};

Blockly.Blocks['waitPerson'] = {
  init: function() {
    this.jsonInit(waitPersonJSON);
  }
};
