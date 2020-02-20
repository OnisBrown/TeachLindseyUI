Blockly.JavaScript['listCond'] = function(block) {
  //GoTo a location
  var target = block.getFieldValue('target');
  var target = block.getFieldValue('check');
  var target = block.getFieldValue('comparitor');
  var target = block.getFieldValue('limit');
  innerCode = "\t" + forDo.replace("\n", "\n \t");
  var code = ``;
  [code, Blockly.JavaScript.ORDER_ATOMIC];
};
