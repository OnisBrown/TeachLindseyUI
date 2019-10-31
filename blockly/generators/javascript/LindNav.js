
Blockly.JavaScript['goTo'] = function(block) {
  //GoTo a location
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get location number";
  var code = "goToCode(" + choice + ");\n";
  return code;
};

function goToCode(choice){
  commandQueue.push(['goTo', choice]);
}

Blockly.JavaScript['goToNode'] = function(block) {
  //GoTo a location
  var choice = block.getFieldValue('waypoint');
  var code = "goToNodeCode(" + choice + ");\n";
  return code;
};

function goToNodeCode(choice){
  commandQueue.push(['goToNode', choice]);
}

Blockly.JavaScript['move'] = function(block) {
  //move in a direction
  var vector = new Array(0, 0, 0, 0);
  vector[0] = block.getFieldValue('x');
  vector[1] = block.getFieldValue('y');
  vector[2] = block.getFieldValue('z');
  vector[3] = block.getFieldValue('D');
  var code = "moveCode(["+ vector[0] + ", " + vector[1] + ", " + vector[2] + ", "+ vector[3] + "]);\n"; //Only passes the first value if written normally
  return code;
};

function moveCode(vector){
	commandQueue.push(['move', vector]);
}

Blockly.JavaScript['exhibitLs'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('exhibit');
  var code =choice;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['goToDescribe'] = function(block){ // go to and describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  var code = "goToDescCode('" + choice + "', "+ behaviours[0]+ ", " + behaviours[1] + ");\n"
  return code;
};


Blockly.JavaScript['goToDescribeWhile'] = function(block){ // go to and describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var extras = Blockly.JavaScript.statementToCode(block, 'DO');
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  extras = extras.split(";");
  var code = "goToDescCode('" + choice + "', "+ behaviours[0]+ ", " + behaviours[1] + ");\n gotToWhile("+ extras +")\n";
  return code;
};

function gotoWhileCode(extras){
  commandQueue.push(['goToDescWhile', choice]);
  for (let i in extras){
    commandQueueL2.push(extras[i]);
  }
  commandQueueL2.push("*");
}

function goToDescCode(choice, behaviours1, behaviours2){
  commandQueue.push(['goToDesc', choice, [behaviours1,behaviours2]]);
}

Blockly.JavaScript['startTour'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('tour');
  var code = "startTourCode('" + choice + "')\n";
  return code;
};

function startTourCode(choice){
  commandQueue.push(['startTour', choice]);
}

Blockly.JavaScript['gazePos'] = function(block) {
  var vector = new Array(0, 0, 0, 0);
  vector[0] = block.getFieldValue('x');
  vector[1] = block.getFieldValue('y');
  vector[2] = block.getFieldValue('z');
  vector[3] = block.getFieldValue('T');
  var code = "gazePosCode(["+ vector[0] + ", " + vector[1] + ", " + vector[2] + ", "+ vector[3] +"]);\n";
  return code;
};

function gazePosCode(vector){
	commandQueue.push(['gazeAtPosition', vector]);
}

Blockly.JavaScript['gazePer'] = function(block) {
  var time;
  time = block.getFieldValue('T');
  var code = "gazePerCode(" + time +");\n";
  return code;
};

function gazePerCode(time){
	commandQueue.push(['gazeAtPerson', time]);
}
