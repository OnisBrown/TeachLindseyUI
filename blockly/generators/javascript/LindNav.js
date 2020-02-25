
Blockly.JavaScript['goTo'] = function(block) {
  //GoTo a location
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get location number";
  var code = "await goToCode(" + choice + ");\n";
  return code;
};

async function goToCode(choice){
  let result = await Picker(['goTo', choice]);
  console.log(result);
}

Blockly.JavaScript['goToNode'] = function(block) {
  //GoTo a location
  var choice = block.getFieldValue('waypoint');
  var code = "await goToNodeCode(" + choice + ");\n";
  return code;
};

async function goToNodeCode(choice){
   let result = await Picker(['goToNode', choice]);
   console.log(result);
}

Blockly.JavaScript['move'] = function(block) {
  //move in a direction
  var vector = new Array(0, 0, 0, 0);
  vector[0] = block.getFieldValue('x');
  vector[1] = block.getFieldValue('y');
  //vector[2] = block.getFieldValue('z');
  vector[3] = block.getFieldValue('D');
  var code = "await moveCode(["+ vector[0] + ", " + vector[1] + ", " + vector[2] + ", "+ vector[3] + "]);\n"; //Only passes the first value if written normally
  return code;
};

async function moveCode(vector){
	let result = await Picker(['move', vector]);
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
  var code = "await goToDescCode('" + choice + "', "+ behaviours[0]+ ", " + behaviours[1] + ");\n"
  return code;
};

async function goToDescCode(choice, behaviours1, behaviours2){
  let result = await Picker(['goToDesc', choice, [behaviours1,behaviours2]]);
}

Blockly.JavaScript['goToDescribeWhile'] = function(block){ // go to and describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var extras = Blockly.JavaScript.statementToCode(block, 'DO');
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  extras = extras.split(";");
  var code = "await goToDescCode('" + choice + "', "+ behaviours[0]+ ", " + behaviours[1] + ");\n gotToWhile("+ extras +")\n";
  return code;
};

function gotoWhileCode(extras){
  commandQueue.push(['goToDescWhile', choice]);
  for (let i in extras){
    commandQueueL2.push(extras[i]);
  }
  commandQueueL2.push("*");
}



Blockly.JavaScript['startTour'] = function(block) {
  //Pick an exhibit
  var choice = block.getFieldValue('tour');
  var code = "await startTourCode('" + choice + "')\n";
  return code;
};

async function startTourCode(choice){
  let result = await Picker(['startTour', choice]);
}

Blockly.JavaScript['gazePos'] = function(block) {
  var vector = new Array(0, 0, 0, 0);
  vector[0] = block.getFieldValue('x');
  vector[1] = block.getFieldValue('y');
  vector[2] = block.getFieldValue('z');
  vector[3] = block.getFieldValue('T');
  var code = "await gazePosCode(["+ vector[0] + ", " + vector[1] + ", " + vector[2] + ", "+ vector[3] +"]);\n";
  return code;
};

async function gazePosCode(vector){
	 let result = await Picker(['gazeAtPosition', vector]);
   console.log(result);
}

Blockly.JavaScript['gazePer'] = function(block) {
  var time;
  time = block.getFieldValue('T');
  var simBool = block.getFieldValue('simulator').toLowerCase();
  var code = "await gazePerCode(" + time +","+ simBool +");\n";
  return code;
};

async function gazePerCode(time){
	let result = await Picker(['gazeAtPerson', time]);
}
