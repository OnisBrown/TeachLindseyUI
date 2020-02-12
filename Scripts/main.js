var workspace;
var xml_txt;
var commandQueue = new Array();
var commandQueuePrev = new Array();
var musJSON = "exhibitors_definition.json";
var userId = 'Guest';
var talking;
var away;
var pivAway;
var curExhibitCoord= [];
var dynDictExhibits ={};

var gazeTargets = {
  people:[],
  objects:[]
};

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
var mainMusJSON = {};
function setExhbitsDict(){
  $.getJSON(musJSON, function(json){
    mainMusJSON = json;
    setTourls();
    setExhbitsls();
    for(i =0; i < mainMusJSON.exhibitors.length; i++){
      dynDictExhibits[mainMusJSON.exhibitors[i].key] = [mainMusJSON.exhibitors[i].waypoint, mainMusJSON.exhibitors[i].metric_map_position, mainMusJSON.exhibitors[i].title];
    }
    console.log(dynDictExhibits)
  }).fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });
}

function setExhbitsls(){
  for(i =0; i < mainMusJSON.exhibitors.length; i++){
    exhibitLsJSON.args0[0].options.push([mainMusJSON.exhibitors[i].title, mainMusJSON.exhibitors[i].key]);
  }
}

function setTourls(){
  for(i =0; i < mainMusJSON.tours.length; i++){
    startTourJSON.args0[0].options.push([mainMusJSON.tours[i].name,mainMusJSON.tours[i].key]);
  }
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
  document.getElementById('code').innerHTML = code;
  var xml = Blockly.Xml.workspaceToDom(workspace);
  xml_txt = Blockly.Xml.domToPrettyText(xml);
}

function init(){
  console.log("loading location lists...");
  setExhbitsDict();

  console.log("lists loaded.");
  console.log("Connecting to botpress")
  try{
    window.botpressWebChat.init({
       host: 'http://10.5.42.157:3000',
       botId: 'chatty_lindsey',
       hideWidget: true,
       exposeStore: true,
       overrideDomain: '127.0.0.1'
     });
  }
  catch (e){
    console.log(e);
  }
  finally{
    console.log("hopefully botpress loaded...");
  }
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
  //workspace.addTopBlock('start');
  var xml = '<xml><block type="start" deletable="false" movable="false"></block></xml>';
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
  workspace.addChangeListener(Blockly.Events.disableOrphans);
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
  commandQueue = [];
  $("#currentAction").empty();
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

function stopActions(){
  cancelCurrentAction();
  Cancel_active_task();
  commandQueue = [];
  rwcActionSetPoseRelative(0,0,0);
  talking = false;
}

function personSense(range){
  console.log("waiting for person...");
  var preempt
  setTimeout(function(){ preempt = true }, 20*1000); //times out the waiting after a minute.
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

function speechPrep(bools, exhibit){
  talking = true;
  if(bools[0]){
    away = false;
    gazeAsync(exhibit);
  }
  if(bools[1]){
    setStartPos();
    pivAsync();
  }
}

function displayAction(curAct){
  $("#currentAction").append("\n" + curAct);
}

function saveCode(){
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_readable = Blockly.Xml.domToPrettyText(xml);
  var xml_text = Blockly.Xml.domToText(xml);
  $.post( "Backend.php", xml_txt);
  localStorage.setItem(document.getElementById("scriptName").value, xml_text);
  localStorage.setItem(document.getElementById("scriptName").value + "_R", xml_readable)
}

function loadCode(){
  //Blockly.Workspace.clear();
  var name = document.getElementById("scriptName").value;
  var xml = Blockly.Xml.textToDom(localStorage.getItem(name));
  Blockly.Xml.domToWorkspace(xml, workspace);
}

function loop(){
  console.log("nout");
}

function Picker(){ // stack of commands from blocks
  // for(i=0; i < commandQueue.length; i++){
  //   console.log("**** "+ commandQueue.length)
  //   console.log("****** " + commandQueue[i][0]);
  // }
  if (commandQueue.length > 0) {
    var current = commandQueue.shift();
    commandQueuePrev.push(current);
    console.log(current);
    switch(current[0]){
			case "waitPer":
        if(current[2]){
          Picker();
        }
        else{
          personSense(current[1]);
          displayAction("waiting for people");

        }
        break;
      case 'goTo':
        var node = dynDictExhibits[current[1]][0];
        curExhibitCoord = dynDictExhibits[current[1]][1];
        // console.log(curExhibitCoord);
        // console.log(curExhibitCoord);
        // console.log(node);
        displayAction("going to exhibit: " + dynDictExhibits[current[1]][2]);
        rwcActionGoToNode(node).on("result", function(status){console.log("goToNode status: " + JSON.stringify(status)); Picker();});
        break;
      case 'goToNode':
        var node = "WayPoint" + current[1];
        // console.log(node);
        rwcActionGoToNode(node).on("result", function(status){console.log("goToWaypoint status: " + JSON.stringify(status)); Picker();});
        break;
      case 'goToDesc':
        var node = dynDictExhibits[current[1]][0];
        curExhibitCoord = dynDictExhibits[current[1]][1];
        // console.log(curExhibitCoord);
        displayAction("going to exhibit: " + dynDictExhibits[current[1]][2]);
        perAction = true;
        rwcActionGoToNode(node).on("result", function(status){
          console.log("gotoNodeDescGoTo: " + JSON.stringify(status));
          perAction = false;
          speechPrep(current[2], true);
          displayAction("describing exhibit: " + dynDictExhibits[current[1]][2]);
          perAction = true;
          rwcActionDescribeExhibit(current[1]).on("result", function(){console.log("gotoNodeDescDesc: " + JSON.stringify(status)); talking = false; perAction = false;  setTimeout(function(){Picker();},2000)});
        });

        break;
      case 'move':
        quatCalc(current[1][3]);
        console.log(qtn);
        displayAction("moving by \u2b06, \u27a1, \u27f3 :"+ current[1]);
        rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2], qtn).on("result", function(status){console.log("move status: " + JSON.stringify(status)); perAction = false; Picker();});
        break;
      case 'speech':
        speechPrep(current[2], false);
        displayAction("saying: " + current[1]);
        rwcActionSay(current[1]).on("result", function(status){console.log("speech status: " + JSON.stringify(status)); talking = false;  setTimeout(function(){Picker();} ,2000)});
        break;
      case 'desc':
        speechPrep(current[2], true);
        curExhibitCoord = dynDictExhibits[current[1]][1];
        console.log(curExhibitCoord);
        displayAction("describing exhibit: " + dynDictExhibits[current[1]][2]);
        rwcActionDescribeExhibit(current[1]).on("result", function(){talking = false; setTimeout(function(){Picker();},2000)});
        break;
      case 'startTour':
        rwcActionStartTour(current[1]).on("result", function(){ Picker();});
        break;
      case 'YNQ&A':
        //rwcActionSay(current[1]);
        rwcActionYesNoModal(current[1]).on("result", function(status){console.log(status); Picker();});
        break;
      case 'askO':
        var response;
        rwcActionSay(current[1]).on("result", function(status){
          console.log("speaking");
          rwcActionStartDialogue();
          var bpMsg = {
            "type": "text",
            "text": "unset"
          }
          $.post(`https://10.5.42.157:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
              function(bpResponse) {
                console.log( "message recieved:" + JSON.stringify(bpResponse));
              });
          //diaTimer =
          rwcListenerGetDialogue().then(function(script){
            bpMsg.type = script;
            $.post(`https://10.5.42.157:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
                function(bpResponse) {
                  console.log( "message recieved:" + JSON.stringify(bpResponse));
                });
              Picker();
          });
        });

        break;
      case 'gazeAtPosition':
        rwcActionGazeAtPosition(current[1][0], current[1][1], current[1][2], current[1][3]).on("result", function(status){console.log("gazePos status: " + JSON.stringify(status)); Picker();});
        break;
      case 'gazeAtPerson':
        if(current[2]){
          Picker();
        }
        else{
          displayAction("looking at nearest person for "+ current[1] + " seconds");
          rwcActionGazeAtNearestPerson(current[1]+3).on("result", function(status){console.log("gazePer status: " + JSON.stringify(status)); Picker();});
          console.log((current[1]+5)*1000);
          setTimeout(function(){Picker();},(current[1]+5)*1000);
        }
        break;
      case 'waitTime':
				console.log("waiting for " + current[1]);
        setTimeout(function(){Picker();},(current[1]+1)*1000);
        break;
    }
  }
  else{
    displayAction("Plan finished!");
    console.log("Plan finished!");
  }
}
