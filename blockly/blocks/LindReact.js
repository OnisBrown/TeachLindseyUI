Blockly.JavaScript['waitPerson'] = function(block) {
  //GoTo a location
  var dist = block.getFieldValue('distance');
  var code = "waitPersonCode(" + dist + "); ";
  return code;
};


function waitPersonCode(dist)
{
	commandQueue.push(["waitPer", dist]);
}

Blockly.JavaScript['askOQuestion'] = function(block) {
  //GoTo a location
  var prompt = block.getFieldValue('prompt');
  var code = "askOCode('" + prompt + "'); ";
  return code;
};

function askOCode(prompt)
{
	commandQueue.push(["askO", prompt]);
}
