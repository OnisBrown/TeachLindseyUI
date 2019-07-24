Blockly.JavaScript['Script'] = function(block) {
  //GoTo a location
  var paragraph = block.getFieldValue('script');
  var code = paragraph;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['give_speech'] = function(block) {
  //GoTo a location
  var paragraph = Blockly.JavaScript.valueToCode(block,'script', Blockly.JavaScript.ORDER_ATOMIC) || "failed to parse speech";
  console.log("doing it");

  var code = "alert('" + paragraph + "'); rwcActionSay('" + paragraph + "');";
  return code;
};
