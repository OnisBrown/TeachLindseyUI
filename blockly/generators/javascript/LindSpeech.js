Blockly.JavaScript['script'] = function(block) {
  var paragraph = block.getFieldValue('script');
  var code = paragraph;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['giveSpeech'] = function(block) {
  var paragraph = block.getFieldValue('script');
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  var code = `giveSpeechCode("${paragraph}", ${behaviours[0]}, ${behaviours[1]});\n`;
  return code;
};

async function giveSpeechCode(paragraph, behaviours1, behaviours2){
  let result = await Picker(['speech', paragraph, [behaviours1,behaviours2]]);
  console.log(result);
}

Blockly.JavaScript['describe'] = function(block){ // describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  var code = `descCode("${choice}", ${behaviours[0]}, ${behaviours[1]});\n`;
  return code;
};

async function descCode(choice, behaviours1, behaviours2){
  let result = await Picker(['desc', choice, [behaviours1,behaviours2]]);
  console.log(result);
}

Blockly.JavaScript['askYNQuestion'] = function(block) {
  var question = block.getFieldValue('question') || "failed to parse speech";
  var code = `askYNQuestionCode("${question}");\n`;
  return code;
};

async function askYNQuestionCode(question){
	let result = await Picker(['YNQ&A', question]);
  console.log(result);
}
