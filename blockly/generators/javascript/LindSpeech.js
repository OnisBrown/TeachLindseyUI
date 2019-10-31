Blockly.JavaScript['script'] = function(block) {
  var paragraph = block.getFieldValue('script');
  var code = paragraph;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['giveSpeech'] = function(block) {
  var paragraph = block.getFieldValue('script');
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  var code = `giveSpeechCode("${paragraph}", ${behaviours[0]}, ${behaviours[1]});`;
  return code;
};

function giveSpeechCode(paragraph, behaviours1, behaviours2){
  commandQueue.push(['speech', paragraph, [behaviours1,behaviours2]]);
}

Blockly.JavaScript['describe'] = function(block){ // describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var behaviours = [block.getFieldValue('gaze').toLowerCase(), block.getFieldValue('pivot').toLowerCase()];
  var code = `descCode("${choice}", ${behaviours[0]}, ${behaviours[1]});`;
  return code;
};

function descCode(choice, behaviours1, behaviours2){
  commandQueue.push(['desc', choice, [behaviours1,behaviours2]]);
}

Blockly.JavaScript['askYNQuestion'] = function(block) {
  var question = block.getFieldValue('question') || "failed to parse speech";
  var code = `askYNQuestionCode("${question}");`;
  return code;
};

function askYNQuestionCode(question){
  commandQueue.push(['YNQ&A', question]);
}
