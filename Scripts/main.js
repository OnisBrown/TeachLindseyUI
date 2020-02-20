var workspace;
var xml_txt;
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
       host: 'http://localhost:3000',
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
  var parsedCode = code.match(/^.*((\r\n|\n|\r)|$)/gm);
  var block = new Array();
  var wCount = 0;
  console.log(parsedCode);
  try{
    parsedCode.forEach(function(line){
      if(line.includes("for (i = ")){
        block.push(['for', line]);
        //console.log("start of for");
      }
      else if(line.includes("while ()")){
        var regWhile = /\(([^)]+)\)/;
        var condition = true; //regExp.exec(line);
        console.log("condition: " + condition);
        whileQueues.push(condition,[]);
        block.push(['while', ]);
        //console.log("start of while");
      }
      else if(line.includes("}")){
      //  console.log("End of " + block[block.length - 1][0]);
        if(block[block.length - 1][0]=='for'){
          var innerFor = block.pop()[1].concat(line) + "\n";
          //console.log(innerFor);
          eval(innerFor);

        }
        else if(block[block.length - 1][0]=='while'){
          wCount -= 1;
          commandQueue.push(['while']);
        }
      }
      else if(block.length==0){
        eval(innerFor);
        eval(line);
      }
      else{
        if(wCount == 0){
          block[block.length - 1][1] += line;
        }

        else if(block[block.length - 1][0]=='while'){
          var temp = line.replace("commandQueue.push(", "whileQueues[0]");
          if(block[block.length - 1][0]=='for'){


          }
          else{
            eval(line);
            console.log("adding" + line + "to while loop");
          }
        }
      }
    });
    //eval(code);
  }
  catch (e){
    alert(e + "\n" + e.lineNumber + " " + e.fileName);
  }
  finally{
    displayAction("Plan finished!");
    console.log("Plan finished!");
  }
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
