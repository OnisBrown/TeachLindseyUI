var workspace
var xml_txt
var commandQueue = new Array();
var commandQueueL2 = new Array();

function updater(event){
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('codeDiv').innerHTML = code;

  var xml = Blockly.Xml.workspaceToDom(workspace);
  xml_txt = Blockly.Xml.domToPrettyText(xml);
}

function init(){
  workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     grid:
        {
          spacing:15,
          length:4,
          colour:'#ccc',
          snap:true
        },
    theme: Blockly.Theme('highcontrast', 'highcontrast')
  });
  workspace.addChangeListener(updater);
  Blockly.JavaScript.addReservedWords('code'); //make code a reserved word

  if(typeof xml_txt != 'undefined'){
    var xml = Blockly.Xml.textToDom(xml_txt);
    Blockly.Xml.domToWorkspace(xml, workspace);
  }
}

// function codeViewer() { // viewer for the code produced
//   var code = Blockly.JavaScript.workspaceToCode(workspace);
//   document.getElementById('codeDiv').innerHTML = code;
// }

// function saveCode(){
//   var pom = document.createElement('a');
//   var filename = "save.xml";
//   var bb = new Blob([xml_txt], {type: 'text/plain'});
//   pom.setAttribute('href', window.URL.createObjectURL(bb));
//   pom.setAttribute('download', filename);
//   pom.draggable = true;
//   pom.classList.add('dragout');
//   pom.click();
//
// }

function checkPeople(){
  rwcListenerGetPeoplePositions().then(function(value){returnPeople(value)});
  console.log("called listener");
}

function returnPeople(peoplePos){
  console.log("listener responded");
  rwcActionGazeAtPosition(peoplePos[0], peoplePos[1], peoplePos[2], 10);
  console.log(peoplePos);
  alert(peoplePos);
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
        rwcActionGoToAndDescribeExhibit(current[1]).on("result", function(){Picker();});
        break;
      case 'move':
        rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'speech':
        rwcActionSay(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'desc':
        console.log(current[1]);
        rwcActionDescribeExhibit(current[1]).on("result", function(){Picker();});
        break;
      case 'startTour':
        rwcActionStartTour(current[1]).on("result", function(){ Picker();});
        break;
    }
  }
  else{
    return;
  }
}
