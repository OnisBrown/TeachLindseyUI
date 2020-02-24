var workspace;
var xml_txt;
var musJSON = "exhibitors_definition.json";
var userId = 'Guest';
var talking;
var busy;
var away;
var pivAway;
var curExhibitCoord= [];
var dynDictExhibits ={};

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
  var code = Blockly.JavaScript.workspaceToCode(workspace).replace(/await/g,"");
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



function executeCode() { // executes code made by blocks
  commandQueue = [];
  $("#currentAction").empty();
  window.LoopTrap = 100;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  var parsedCode = code.match(/^.*((\r\n|\n|\r)|$)/gm); //seperates entire code into
  var block = new Array();
  var lCount = 0;
  console.log(parsedCode);
  try{
    for(let line of parsedCode){
      if(line.includes("for (i =")|| line.includes("while(")){
        lCount +=1;
        block[block.length-1] += line;
      }
      else if(line.includes("}")){
        lCount -=1;
        block[block.length-1] += line + "\n";
      }
      else if(lCount>0){
        block[block.length-1] +=line;
      }
      else{
        if (line) {
          block.push(line);
       }
      }
    }
    block.push(`displayAction("Plan finished!");`);
    block.push(`console.log("Plan finished!");`);
    let s = "(async () => { " + block.join("") + " })()"
    console.log(s);
    eval(s);


  }
  catch (e){
    alert(e + "\n" + e.lineNumber + " " + e.fileName);
  }
  finally{

  }
}

function stopActions(){
  cancelCurrentAction();
  Cancel_active_task();
  commandQueue = [];
  rwcActionSetPoseRelative(0,0,0);
  talking = false;
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
  workspace.clear();
  var name = document.getElementById("scriptName").value;
  var xml = Blockly.Xml.textToDom(localStorage.getItem(name));
  Blockly.Xml.domToWorkspace(xml, workspace);
}
