Blockly.JavaScript['Location'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('location');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['GoTo'] = function(block) {
  //GoTo a location
  var choice = Blockly.JavaScript.valueToCode(block,'location', Blockly.JavaScript.ORDER_ATOMIC) || "failing to grab var";
  console.log(choice);

  var code = "rwcActionGoToNode('WayPoint" + choice + "');";
  return code;
};

Blockly.JavaScript['move'] = function(block) {
  //move in a direction
  var vector = {x:0, y:0, z:0};
   vector.x = Blockly.JavaScript.valueToCode(block,'x', Blockly.JavaScript.ORDER_ATOMIC) || 0;
   vector.y = Blockly.JavaScript.valueToCode(block,'y', Blockly.JavaScript.ORDER_ATOMIC) || 0;
   vector.z = Blockly.JavaScript.valueToCode(block,'z', Blockly.JavaScript.ORDER_ATOMIC) || 0;

  console.log(vector.x + ' ' + vector.y + ' ' + vector.z);
  var code = "rwcActionSetPoseRelative(2, 0, 0);"
  return code;
};
