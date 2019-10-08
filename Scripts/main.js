var workspace
var xml_txt
var commandQueue = new Array();
var commandQueueL2 = new Array();
var passives = new Worker('../webWorkers/Passives.js');
var botStream = new Worker('../webWorkers/ChatSocket.js')
qtn = {
  x:0,
  y:0,
  z:0,
  w:1
}
var dictExhibits = { //list of nodes for each exhibit to match goto function
  "1.1": 17,
  "1.2": 12,
  "1.3": 11,
  "1.4": 8,
  "1.5": 6,
  "1.6": 3,
  "2.1": 19,
  "2.2": 18,
  "2.3": 14,
  "2.4": 7,
  "2.5": 2,
  "3.1": 13,
  "3.2": 10,
  "3.3": 6,
  "3.4": 4,
  "3.5": 3,
  "4.1": 16,
  "4.2": 15,
  "4.3": 9,
  "4.4": 5,
  "4.5": 3
}

function quatCalc(angle){
  var b = (angle*(Math.PI/180))/2;
  var s1 = 0; //sin(0/2)
  var c1 = 1;//cos(0/2)
  var s2 = 0;//sin(0/2)
  var c2 = 1;//cos(0/2)
  var s3 = Math.sin(b);
  var c3 = Math.cos(b);

  qtn.z = c1*c2*s3;
  qtn.w = c1*c2*c3;

}

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

function Gaze(){
  rwcActionGazeAtPosition();
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
        var node = dictExhibits[current[1]];
        console.log(node);
        rwcActionGoToNode("WayPoint" + node).on("result", function(status){console.log(status); Picker();});
        break;
      case 'goToDesc':
        console.log(current[1]);
        rwcActionGoToAndDescribeExhibit(current[1]).on("result", function(){Picker();});
        break;
      case 'move':
        quatCalc(current[1][3]);
        console.log(qtn);
        rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2], qtn).on("result", function(status){console.log(status); Picker();});
        break;
      case 'speech':
        // start rotations while talking
        talking = true;
        talkingAn();
        rwcActionSay(current[1]).on("result", function(status){talking = false; Picker();});
        break;
      case 'desc':
        console.log(current[1]);
        talking = true;
        talkingAn();
        rwcActionDescribeExhibit(current[1]).on("result", function(){ talking = false; Picker();});
        break;
      case 'startTour':
        rwcActionStartTour(current[1]).on("result", function(){ Picker();});
        break;
      case 'YNQ&A':
        //rwcActionSay(current[1]);
        rwcActionYesNoModal(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
    }
  }
  else{
    return;
  }
}
