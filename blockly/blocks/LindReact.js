Blockly.JavaScript['waitPerson'] = function(block) {
  //GoTo a location
  var dist = block.getFieldValue('distance');
  var code = "waitPersonCode(" + dist + ");\n";
  return code;
};


function waitPersonCode(dist)
{
	commandQueue.push(["waitPer", dist]);
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
  var code = `//Start here \n`;
  return code;
}
