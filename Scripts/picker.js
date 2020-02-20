//Queue management functions

function Picker(current){ // stack of commands from blocks
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
      // rwcActionSay(current[1]).on("result", function(status){
      //   console.log("speaking");
      //   rwcActionStartDialogue();
      //   var bpMsg = {
      //     "type": "text",
      //     "text": "unset"
      //   }
      //   $.post(`https://localhost:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
      //       function(bpResponse) {
      //         console.log( "message recieved:" + JSON.stringify(bpResponse));
      //       });
      //   //diaTimer =
      //   rwcListenerGetDialogue().then(function(script){
      //     bpMsg.type = script;
      //     $.post(`https://localhost:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
      //         function(bpResponse) {
      //           console.log( "message recieved:" + JSON.stringify(bpResponse));
      //         });
      //       Picker();
      //   });
      // });
      var bpMsg = {
          "type": "text",
          "text": "take me to the graves"
        }
      $.post(`https://localhost:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
            function(bpResponse) {
              console.log( "message recieved:" + JSON.stringify(bpResponse));
            });
        //diaTimer =
        rwcListenerGetDialogue().then(function(script){
          bpMsg.type = script;
          $.post(`https://localhost:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
              function(bpResponse) {
                console.log( "message recieved:" + JSON.stringify(bpResponse));
              });
            Picker();
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
    case 'while':
      Picker(true, 0);
      break;
    case 'whileEnd':
      if(condition){
        whileQueues.pop();
      }
      break;
  }
}
