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
  //Pick an exhibit
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exhibitLs2'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exhibitLs3'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exhibitLs4'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['goToDescribe'] = function(block){ // go to and describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var code = "goToDescCode('" + choice + "');"
  return code;
};


Blockly.JavaScript['goToDescribeWhile'] = function(block){ // go to and describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var extras = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = "goToDescCode('" + choice + "'); gotToWhile("+ extras +")";
  return code;
};

function gotoWhile(extras){
  
}

function goToDescCode(choice){
  commandQueue.push(['goToDesc', choice]);
}

Blockly.JavaScript['startTour'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('tour');
  var code = "startTourCode('" + choice + "')";
  return code;
};

function startTourCode(choice){
  commandQueue.push(['startTour', choice]);
}
