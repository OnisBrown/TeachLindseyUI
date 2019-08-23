var workspace

var commandQueue = new Array();
// var queueCounter = 0;
// var queueIndex = 0;

function init(){
  workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     grid:
        {
          spacing:15,
          length:4,
          colour:'#ccc',
          snap:true
        }
  });

  Blockly.JavaScript.addReservedWords('code'); //make code a reserved word
}

function codeViewer() { // viewer for the code produced
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('codeDiv').innerHTML = code;
}

function executeCode() { // executes code made by blocks
  window.LoopTrap = 100;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  try{
    eval(code);
  }
  catch (e){
    alert(e);
  }
  finally{
    Picker();
  }
}

function Picker(){
  console.log(commandQueue);
  if (commandQueue.length > 0) {
    var current = commandQueue.shift();
    console.log(current[0] + " " + current[1]);
    switch(current[0]){
      case 'goTo':
        rwcActionGoToNode("WayPoint" + current[1]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'goToDesc':
        console.log(current[1]);
        rwcActionGoToAndDescribeExhibit(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'move':
        rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'speech':
        rwcActionSay(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'desc':
        console.log(current[1]);
        rwcActionDescribeExhibit(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
    }
  }
  else{
    return;
  }
}
