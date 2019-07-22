Blockly.JavaScript['Location'] = function(block) {
  //GoTo a location
  var choice = block.getFieldValue('location');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['GoTo'] = function(block) {
  //GoTo a location
  var choice = Blockly.JavaScript.valueToCode(block,'location', Blockly.JavaScript.ORDER_ATOMIC) || "failing to grab var";
  console.log(choice);

  var code = "alert('" + choice + "'); rwcActionGoToNode(22)";
  return code;
};
