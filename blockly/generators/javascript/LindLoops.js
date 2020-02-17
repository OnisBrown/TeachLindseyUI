Blockly.JavaScript['lindFor'] = function(block) {
  //GoTo a location
  var iterations = block.getFieldValue('iterations');
  var forDo = Blockly.JavaScript.statementToCode(block, 'DO');
  innerCode = "\t" + forDo.replace("\n", "\n \t");
  var code = `for (i = 0; i < ${iterations}; i++) {\n  ${innerCode}}\n`;
  return code;
};

Blockly.JavaScript['lindWhile'] = function(block) {
  //GoTo a location
  var condition = block.getFieldValue('condition');
  var forDo = Blockly.JavaScript.statementToCode(block, 'DO');
  innerCode = "\t" + forDo.replace("\n", "\n \t");
  var code = `while (${condition}){\n ${innerCode}}\n`;
  return code;
};
