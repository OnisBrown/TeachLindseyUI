Blockly.JavaScript['waitPerson'] = function(block) {
  //GoTo a location
  var dist = block.getFieldValue('distance');
  var simBool = block.getFieldValue('simulator').toLowerCase();
  var code = "waitPersonCode(" + dist + ","+ simBool +");\n";
  return code;
};


function waitPersonCode(dist, simBool)
{
	let result = await Picker(["waitPer", dist, simBool]);
}

Blockly.JavaScript['pause'] = function(block) {
  //GoTo a location
  var seconds = block.getFieldValue('time');
  var code = "waitTimeCode(" + seconds +");\n";
  return code;
};

function waitTimeCode(pause)
{
	let result = await Picker(["waitTime", pause]);
}

Blockly.JavaScript['askOQuestion'] = function(block) {
  //GoTo a location
  var prompt = block.getFieldValue('prompt');
  var code = `askOCode("${prompt}");\n`;
  return code;
};

function askOCode(prompt)
{
	let result = await Picker(["askO", prompt]);
}

Blockly.JavaScript['start'] = function(block){
  var code = '';
  return code;
}
