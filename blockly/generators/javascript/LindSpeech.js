Blockly.JavaScript['script'] = function(block) {
  var paragraph = block.getFieldValue('script');
  var code = paragraph;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['giveSpeech'] = function(block) {
  var paragraph = block.getFieldValue('script');
  var code = "giveSpeechCode('" + paragraph + "');";
  return code;
};

function giveSpeechCode(paragraph){
  commandQueue.push(['speech', paragraph]);
}

Blockly.JavaScript['describe'] = function(block){ // describe an exhibit
  var choice = Blockly.JavaScript.valueToCode(block,'exhibit', Blockly.JavaScript.ORDER_ATOMIC) || "failing to get exhibit name";
  var code = "descCode('" + choice + "');"
  return code;
};

function descCode(choice){
  commandQueue.push(['desc', choice]);
}

Blockly.JavaScript['askYNQuestion'] = function(block) {
  var question = block.getFieldValue('question') || "failed to parse speech";
  var code = "askYNQuestionCode('" + question + "');";
  return code;
};

function askYNQuestionCode(question){
  commandQueue.push(['YNQ&A', question]);
}
