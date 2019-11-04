var workspace;
var xml_txt;
var commandQueue = new Array();
var commandQueueL2 = new Array();
var pivWork = new Worker('../webWorkers/pivPass.js');
var gazeWork = new Worker('../webWorkers/gazePass.js');
//var botStream = new Worker('../webWorkers/ChatSocket.js');
var talking;
var away;
var gazeTargets = {
  people:[],
  objects:[]
};

function

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

// create a dictionary of exhibit keys and their matching waypoints
var dynDictExhibits = {};
function setExhbitsDict(){
  var exhibitsRaw;
  $.getJSON("fablab.json", function(json){
    exhibitorsJSON = json;
    exhibitsRaw = exhibitorsJSON.exhibitors;
    for(i =0; i < exhibitsRaw.length; i++){
      dynDictExhibits[exhibitsRaw[i].key] = exhibitsRaw[i].waypoint;
    }
  }).fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  console.log("loading location lists...");
  setExhbitsDict();
  setTourls();
  setExhbitsls();
  console.log("lists loaded.");

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

async function pivAsync(){
  var ang = 45;
  pInterval = 7;
  if(talking){
    await sleep(pInterval*1000);
    ang*= -1;
    quatCalc(ang);
    rwcActionSetPoseRelative(0, 0, 0, qtn).on("result", function(){
      pivAsync();
    });
  }
  else{
    console.log("final position at" + startPos);
    rwcActionSetPoseMap(startPos.x, startPos.y, startPos.z, startPos.q);
  }
}

async function gazeAsync(){
  gInterval = 3;
  await sleep(gInterval*1000);
  if(talking){
    console.log("looking away" + away);
    if (away){
      rwcActionGazeAtNearestPerson(4).on("result", function(){
        // away = !away;
        // gazeAsync();
      });
      away = !away;
      gazeAsync();
    }
    else{
      rwcActionGazeAtPosition(0,0,0,3).on("result", function(){
        // away = !away;
        // gazeAsync();
      });
      away = !away;
      gazeAsync();
    }
  }
}

// pivWork.addEventListener('message', function(event){
//   var ang = 45;
//   if(!talking){
//     pivWork.postMessage("stopSpeaking");
//     if(event.data == 0)
//       {
//         console.log("final position at" + startPos);
//         rwcActionSetPoseMap(startPos.x, startPos.y, startPos.z, startPos.q);
//       }
//   }
//   else{
//     quatCalc(ang*event.data);
//     rwcActionSetPoseRelative(0, 0, 0, qtn);
//   }
// });

// pivWork.addEventListener('error', function(event){console.error("error: ", event);});

// gazeWork.addEventListener('message', function(event){
//   var ang = 45;
//   if(!talking){
//     gazeWork.postMessage("stopSpeaking");
//     rwcActionGazeAtNearestPerson(3);
//   }
//   else{
//     quatCalc(ang*event.data);
//     rwcActionGazeAtPosition([3,10,2,2]);
//   }
// });

// gazeWork.addEventListener('error', function(event){console.error("error: ", event);});

function personSense(range){
  console.log("waiting for person...");
  var preempt
  setTimeout(function(){ preempt = true }, 5*1000); //times out the waiting after a minute.
  rwcListenerGetNearestDist(null, true).then(function(myTopic){
    myTopic.subscribe(function(msg){
      var dist;
      dist = msg.min_distance;
      console.log(dist);
      if((dist < range && dist >0) || preempt){
        console.log("found person: " + !preempt);
        myTopic.unsubscribe();
        if(commandQueue.length>0){
          Picker();
        }
        else{
          console.log("Done waiting, no further instructions");
        }
      }
    });
  });
}

function targetAngle(position){

}

function Demo(){
  commandQueue.push(['gotToNode',])
}

function speechPrep(bools){
  talking = true;
  if(bools[0]){
    away = false;
    gazeAsync();
  }
  if(bools[1]){
    setStartPos();
    pivAsync();
    //pivWork.postMessage("speaking");
  }
}

function Picker(){ // stack of commands from blocks
  console.log(commandQueue);
  if (commandQueue.length > 0) {
    var current = commandQueue.shift();
    console.log(current);
    switch(current[0]){
			case "waitPer":
        personSense(current[1]);
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
        var node = dynDictExhibits[current[1]];
        rwcActionGoToNode(node).on("result", function(status){
          console.log(status);
          speechPrep(current[2]);
          rwcActionDescribeExhibit(current[1]).on("result", function(){talking = false;Picker();});
        });

        break;
      case 'move':
        quatCalc(current[1][3]);
        console.log(qtn);
        rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2], qtn).on("result", function(status){console.log(status); Picker();});
        break;
      case 'speech':
        speechPrep(current[2]);
        rwcActionSay(current[1]).on("result", function(status){talking = false; Picker();});
        break;
      case 'desc':
        speechPrep(current[2]);
        rwcActionDescribeExhibit(current[1]).on("result", function(){talking = false; Picker();});
        break;
      case 'startTour':
        rwcActionStartTour(current[1]).on("result", function(){ Picker();});
        break;
      case 'YNQ&A':
        //rwcActionSay(current[1]);
        rwcActionYesNoModal(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
        case 'askO':
          rwcActionSay(current[1]).on("result", function(status){
            console.log("speaking");
            rwcActionStartDialogue();
            rwcListenerGetDialogue().then(function(script){
              console.log("listened");
              rwcActionSay(script).on("result", function(status){
                Picker();
              });
            });
          });

          break;
        case 'gazeAtPosition':
          rwcActionGazeAtPosition(current[1][0], current[1][1], current[1][2], current[1][3]).on("result", function(status){console.log(status); Picker();});
          break;
        case 'gazeAtPerson':
          rwcActionGazeAtNearestPerson(current[1]).on("result", function(status){console.log(status); Picker();});
          break;
    }
  }
  else{
    console.log("Plan finished!");
  }
}
