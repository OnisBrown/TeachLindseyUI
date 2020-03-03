function Picker(current){ // stack of commands from blocks
    return new Promise( resolve => {
      switch(current[0]){
    		case "waitPer":
          if(current[2]){
            resolve("this is simulation");
          }
          else{
			displayAction("waiting for people");
            resolve(personSense(current[1]));
          }
          break;
        case 'goTo':
          var node = dynDictExhibits[current[1]][0];
          curExhibitCoord = dynDictExhibits[current[1]][1];
          // console.log(curExhibitCoord);
          // console.log(curExhibitCoord);
          // console.log(node);
          displayAction("going to exhibit: " + dynDictExhibits[current[1]][2]);
          rwcActionGoToNode(node).on("result", (status) => {
            resolve("goToNode status: " + JSON.stringify(status))
          });
          break;
        case 'goToNode':
          var node = "WayPoint" + current[1];
          // console.log(node);
          rwcActionGoToNode(node).on("result", (status)=>{
			  resolve("goToWaypoint status: " + JSON.stringify(status));});
          break;
        case 'goToDesc':
          var node = dynDictExhibits[current[1]][0];
          curExhibitCoord = dynDictExhibits[current[1]][1];
          // console.log(curExhibitCoord);
          displayAction("going to exhibit: " + dynDictExhibits[current[1]][2]);
          perAction = true;
          rwcActionGoToNode(node).on("result", (status)=>{
            console.log("gotoNodeDescGoTo: " + JSON.stringify(status));
            perAction = false;
            speechPrep(current[2], true);
            displayAction("describing exhibit: " + dynDictExhibits[current[1]][2]);
            perAction = true;
            rwcActionDescribeExhibit(current[1]).on("result", ()=>{
				talking = false;
				perAction = false;
				setTimeout(function(){
					resolve("gotoNodeDescDesc: " + JSON.stringify(status));
				},2000)

			});
          });
          break;
        case 'move':
          quatCalc(current[1][3]);
          console.log(qtn);
          displayAction("moving by \u2b06, \u27a1, \u27f3 :"+ current[1]);
          rwcActionSetPoseRelative(current[1][0], current[1][1], current[1][2], qtn).on("result", (status)=>{
			  resolve("move status: " + JSON.stringify(status));
			  perAction = false;
			});
          break;
        case 'speech':
          speechPrep(current[2], false);
          displayAction("saying: " + current[1]);
          rwcActionSay(current[1]).on("result", (status)=>{
			  talking = false;
			  setTimeout(function(){resolve("speech status: " + JSON.stringify(status));} ,2000)
			});
          break;
        case 'desc':
          speechPrep(current[2], true);
          curExhibitCoord = dynDictExhibits[current[1]][1];
          console.log(curExhibitCoord);
          displayAction("describing exhibit: " + dynDictExhibits[current[1]][2]);
          rwcActionDescribeExhibit(current[1]).on("result", ()=>{
			  talking = false;
			  setTimeout(function(){resolve("exhibit descrbed")},2000)
			});
          break;
        case 'startTour':
          rwcActionStartTour(current[1]).on("result", ()=>{
			  resolve("tour finished");
		  });
          break;
        case 'YNQ&A':
          //rwcActionSay(current[1]);
          rwcActionYesNoModal(current[1]).on("result", function(status){resolve(status);});
          break;
        case 'askO':
          var response;
          var bpResponse;
          var xhr = new XMLHttpRequest;
          displayAction("waiting for request ");
          xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
              var status = xhr.status;
              if (status === 0 || (200 >= status && status < 400)) {
                // The request has been completed successfully
                bpResponse= xhr.responseXML;
                console.log("request to botpress succeded")
                resolve(bpResponse);
              } else{
                console.log("not yet");
              }
            }
          }
          xhr.open("POST", `https://10.5.42.157:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, true);
          xhr.setRequestHeader("crossDomain", "true");
          rwcActionSay(current[1]).on("result", function(status){
            console.log("speaking");
            rwcActionStartDialogue();
            var bpMsg = {
              "type": "text",
              "text": "unset"
            }
            // $.post(`https://localhost:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`, bpMsg,
            //     function(bpResponse) {
            //       console.log( "message recieved:" + JSON.stringify(bpResponse));
            //     });
            // //diaTimer =
            rwcListenerGetDialogue().then(function(script){
              bpMsg.text = script;
              xhr.send(JSON.stringify(bpMsg));
            });
          });
          break;
        case 'gazeAtPosition':
          rwcActionGazeAtPosition(current[1][0], current[1][1], current[1][2], current[1][3]).on("result", (status)=>{
			  resolve("gazePos status: " + JSON.stringify(status));
			});
          break;
        case 'gazeAtPerson':
          if(current[2]){
            resolve("this is the simulation");
          }
          else{
            displayAction("looking at nearest person for "+ current[1] + " seconds");
            rwcActionGazeAtNearestPerson(current[1]+3).on("result", (status)=>{
				 ;});
            console.log((current[1]+5)*1000);
            setTimeout(function(){resolve("gazePer status: " + JSON.stringify(status));},(current[1]+5)*1000);
          }
          break;
        case 'waitTime':
    			console.log("waiting for " + current[1]);
          setTimeout(function(){},(current[1]+1)*1000);
          break;
      //   case 'while':
      //     Picker(true, 0);
      //     break;
      //   case 'whileEnd':
      //     if(condition){
      //       whileQueues.pop();
      //     }
      //     break;

    }
  });
}
