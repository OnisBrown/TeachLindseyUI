Blockly.JavaScript['location'] = function(block) {
  //Pick a location
  var choice = block.getFieldValue('location');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['goTo'] = function(block) {
  //GoTo a location
  var choice = Blockly.JavaScript.valueToCode(block,'location', Blockly.JavaScript.ORDER_ATOMIC) || "failing to grab var";
  console.log(choice);
  var code = "goToCode(" + choice + "); "
  return code;
};

Blockly.JavaScript['move'] = function(block) {
  //move in a direction
  var vector = [0, 0, 0];
  vector[0] = Blockly.JavaScript.valueToCode(block,'x', Blockly.JavaScript.ORDER_ATOMIC) || 0.5;
  vector[1] = Blockly.JavaScript.valueToCode(block,'y', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  vector[2] = Blockly.JavaScript.valueToCode(block,'z', Blockly.JavaScript.ORDER_ATOMIC) || 0;

  console.log(vector[0] + ' ' + vector[1] + ' ' + vector[2]);
  var code = "moveCode("+ vector +");"
  return code;
};

Blockly.JavaScript['goToDescribe'] = function(block){
  var choice = Blockly.JavaScript.valueToCode(block,'location', Blockly.JavaScript.ORDER_ATOMIC) || "failing to grab var";
  console.log(choice);
  var code = "goToDescCode(" + choice + ");"
  return code;
};

function moveCode(vector){
	//rwcActionSetPoseRelative(vector[0], vector[1], vector[2]).on("result", function(status){Goalstatus.movement = false});
	commandQueue.push(['move', vector]);
}

function goToCode(choice){
//rwcActionGoToNode("WayPoint" + choice).on("result", function(status){console.log(status)});
  commandQueue.push(['goTo', choice]);
}

function gotToDesccode(choice){
  commandQueue.push(['goToDesc', choice]);
}
