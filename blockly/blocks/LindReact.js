Blockly.JavaScript['waitPerson'] = function(block) {
  //GoTo a location
  var dist = block.getFieldValue('distance');
  var simBool = block.getFieldValue('simulator').toLowerCase();
  var code = "waitPersonCode(" + dist + ","+ simBool +");\n";
  return code;
};


function waitPersonCode(dist, simBool)
{
	commandQueue.push(["waitPer", dist, simBool]);
}

Blockly.JavaScript['pause'] = function(block) {
  //GoTo a location
  var seconds = block.getFieldValue('time');
  var code = "waitTimeCode(" + seconds +");\n";
  return code;
};

function waitTimeCode(pause)
{
	commandQueue.push(["waitTime", pause]);
}

Blockly.JavaScript['askOQuestion'] = function(block) {
  //GoTo a location
  var prompt = block.getFieldValue('prompt');
  var code = `askOCode("${prompt}");\n`;
  return code;
};

function askOCode(prompt)
{
	commandQueue.push(["askO", prompt]);
}

Blockly.JavaScript['start'] = function(block){
  var code = '';
  return code;
}
