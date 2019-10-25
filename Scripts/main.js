var workspace;
var xml_txt;
var commandQueue = new Array();
var commandQueueL2 = new Array();
var pivWork = new Worker('../webWorkers/pivPass.js');
var gazeWork = new Worker('../webWorkers/gazePass.js');
var botStream = new Worker('../webWorkers/ChatSocket.js');
var talking;

var startPos = {
  x: 0,
  y: 0,
  z: 0,
  q: {
    x:0,
    y:0,
    z:0,
    w:1
    }
};

var qtn = { //struct for quaternion
  x:0,
  y:0,
  z:0,
  w:1
};

// var dictExhibits = { //list of nodes for each exhibit to match goto function
//   "1.1": 17,
//   "1.2": 12,
//   "1.3": 11,
//   "1.4": 8,
//   "1.5": 6,
//   "1.6": 3,
//   "2.1": 19,
//   "2.2": 18,
//   "2.3": 14,
//   "2.4": 7,
//   "2.5": 2,
//   "3.1": 13,
//   "3.2": 10,
//   "3.3": 6,
//   "3.4": 4,
//   "3.5": 3,
//   "4.1": 16,
//   "4.2": 15,
//   "4.3": 9,
//   "4.4": 5,
//   "4.5": 3
// };

// create a dictionary of exhibit keys and their matching waypoints
var dynDictExhibits = {};
function setExhbits(){
  var exhibitsRaw;
  $.getJSON("exhibitors_definition.json",
  function(json){
    exhibitorsJSON = json;
    exhibitsRaw = exhibitorsJSON.exhibitors;
    for(i =0; i < exhibitsRaw.length; i++){
      dynDictExhibits[exhibitsRaw[i].key] = exhibitsRaw[i].waypoint;
    }
  });
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

function Gaze(){
  quatCalc(0);
  rwcActionGazeAtPosition(0,0,0,3);
}

function updater(event){
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('codeDiv').innerHTML = code;

  var xml = Blockly.Xml.workspaceToDom(workspace);
  xml_txt = Blockly.Xml.domToPrettyText(xml);
}

function init(){
  setExhbits();
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

function setStartPos(){
  rwcListenerGetPosition().then(function(pos){
    startPos.x = pos[0];
    startPos.y = pos[1];
    startPos.z = pos[2];
  });

  var ang = rwcListenerGetOrientation().then(function(ang){
    startPos.q.x = ang[0];
    startPos.q.y = ang[1];
    startPos.q.z = ang[2];
    startPos.q.w = ang[3];
  });
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

pivWork.addEventListener('message', function(event){
  var ang = 45;
  if(!talking){
    pivWork.postMessage("stopSpeaking");
    console.log("final position at" + startPos)
    rwcActionSetPoseMap(startPos.x, startPos.y, startPos.z, startPos.q);
  }
  else{
    quatCalc(ang*event.data);
    rwcActionSetPoseRelative(0, 0, 0, qtn)
  }


});

pivWork.addEventListener('error', function(event){console.error("error: ", event);});

// function personDist(perCoord){
// 	var dist = 0;
// 	setStartPos();
// 	dist = Math.sqrt(Math.pow((perCoord.x-startPos.x),2) + Math.pow((perCoord.y-startPos.x),2) + Math.pow((perCoord.z-startPos.x),2));
//   return dist;
// }

function Picker(){
  console.log(commandQueue);
  if (commandQueue.length > 0) {
    var current = commandQueue.shift();
    console.log(current[0] + " " + current[1]);
    switch(current[0]){
			case "waitPer":
        console.log("waiting for person...")
				rwcListenergetnearestDist(null, true).then(function(myTopic){
					myTopic.subscribe(function(msg){
            var dist;
						dist = msg.min_distance;
            console.log(dist);
            if(dist < current[1] && dist >0){
              console.log("found person");
              Picker();
              return;
            }
					});
				});
				break;
      case 'goTo':
        var node = dynDictExhibits[current[1]];
        rwcActionGoToNode(node).on("result", function(status){console.log(status); Picker();});
        break;
      case 'goToNode':
        var node = "WayPoint" + current[1];
        console.log(node);
        rwcActionGoToNode(node).on("result", function(status){console.log(status); Picker();});
        break;
      case 'goToDesc':
        rwcActionGoToAndDescribeExhibit(current[1]).on("result", function(){Picker();});
        break;
      case 'move':
        quatCalc(current[1][3]);
        console.log(qtn);
        rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2], qtn).on("result", function(status){console.log(status); Picker();});
        break;
      case 'speech':
        setStartPos();
        talking = true;
        pivWork.postMessage("speaking");
        rwcActionSay(current[1]).on("result", function(status){talking = false; Picker();});
        break;
      case 'desc':
        setStartPos();
        talking = true;
        pivWork.postMessage("speaking");
        rwcActionDescribeExhibit(current[1]).on("result", function(){talking = false; Picker();});
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
