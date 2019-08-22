Blockly.JavaScript['location'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('location');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['goTo'] = function(block) {
  //GoTo a location
  var choice = Blockly.JavaScript.valueToCode(block,'location', Blockly.JavaScript.ORDER_ATOMIC) || "failing to gget location number";
  var code = "goToCode(" + choice + "); "
  return code;
};

function goToCode(choice){
//rwcActionGoToNode("WayPoint" + choice).on("result", function(status){console.log(status)});
  commandQueue.push(['goTo', choice]);
}

Blockly.JavaScript['move'] = function(block) {
  //move in a direction
  var vector = [0, 0, 0];
  vector[0] = Blockly.JavaScript.valueToCode(block,'x', Blockly.JavaScript.ORDER_ATOMIC) || 0.5;
  vector[1] = Blockly.JavaScript.valueToCode(block,'y', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  vector[2] = Blockly.JavaScript.valueToCode(block,'z', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = "moveCode("+ vector +");"
  return code;
};

function moveCode(vector){
	//rwcActionSetPoseRelative(vector[0], vector[1], vector[2]).on("result", function(status){Goalstatus.movement = false});
	commandQueue.push(['move', vector]);
}

Blockly.JavaScript['exhibitLs1'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exhibitLs2'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exhibitLs3'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exhibitLs4'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['goToDescribe'] = function(block){
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var code = "goToDescCode(" + choice + ");"
  return code;
};

function goToDescCode(choice){
  commandQueue.push(['goToDesc', choice]);
}
