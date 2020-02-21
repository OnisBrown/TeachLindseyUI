Blockly.JavaScript['listCond'] = function(block) {
  //GoTo a location
  var target = block.getFieldValue('target');
  var check = block.getFieldValue('check');
  var comp = block.getFieldValue('comparitor');
  var lim = block.getFieldValue('limit');
  var code = `${target} ${comp} ${lim}`;
  [code, Blockly.JavaScript.ORDER_ATOMIC];
};
