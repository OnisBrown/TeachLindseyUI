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
  var vector = new Array(0, 0, 0);
  vector[0] = block.getFieldValue('x');
  vector[1] = block.getFieldValue('y');
  vector[2] = block.getFieldValue('z');
  var code = "moveCode(["+ vector[0] + ", " + vector[1] + ", " + vector[2] + "]);"; //Only passes the first value if written normally
  return code;
};

function moveCode(vector){
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
