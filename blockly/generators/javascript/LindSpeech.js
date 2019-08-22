Blockly.JavaScript['script'] = function(block) {
  //GoTo a location
  var paragraph = block.getFieldValue('script');
  var code = paragraph;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['giveSpeech'] = function(block) {
  //GoTo a location
  var paragraph = Blockly.JavaScript.valueToCode(block,'script', Blockly.JavaScript.ORDER_ATOMIC) || "failed to parse speech";
  console.log(paragraph);

  var code = "giveSpeechCode('" + paragraph + "');";
  return code;
};

function giveSpeechCode(paragraph){
  commandQueue.push(['speech', paragraph]);
}
