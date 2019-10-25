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
  var dist = block.getFieldValue('distance');
  var code = "waitPersonCode(" + dist + "); ";
  return code;
};

function waitPersonCode(dist)
{
	commandQueue.push(["askO", dist]);
}
