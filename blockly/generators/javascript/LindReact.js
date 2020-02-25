Blockly.JavaScript['waitPerson'] = function(block) {
  //GoTo a location
  var dist = block.getFieldValue('distance');
  var simBool = block.getFieldValue('simulator').toLowerCase();
  var code = "await waitPersonCode(" + dist + ","+ simBool +");\n";
  return code;
};


async function waitPersonCode(dist, simBool)
{
	let result = await Picker(["waitPer", dist, simBool]);
  console.log(result);
}

Blockly.JavaScript['pause'] = function(block) {
  //GoTo a location
  var seconds = block.getFieldValue('time');
  var code = "await waitTimeCode(" + seconds +");\n";
  return code;
};

async function waitTimeCode(pause)
{
	let result = await Picker(["waitTime", pause]);
  console.log(result);
}

Blockly.JavaScript['askOQuestion'] = function(block) {
  //GoTo a location
  var prompt = block.getFieldValue('prompt');
  var code = `await askOCode("${prompt}");\n`;
  return code;
};

async function askOCode(prompt)
{
	let result = await Picker(["askO", prompt]);
  console.log(result);
}

Blockly.JavaScript['start'] = function(block){
  var code = '';
  return code;
}
