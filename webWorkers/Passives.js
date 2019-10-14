var pivotSwitch = 1;
var talking;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



self.onmessage = function(event){
  switch(event.data){
    case "speaking":
      talking = true;
      talkingClock();
      break;
    case "stopSpeaking":
      talking = false;
      break
  }
}

async function checkPeople(){
  console.log("calling listener");
  rwcActionGazeAtPosition(0, 1, 2, 10);
  rwcListenerGetPeoplePositions(null, true).then(function(peoplePosiTopic){
    peoplePosiTopic.subscribe(function(msg){
      console.log(msg);
    })
  });
}

function returnPeople(peoplePos){
  console.log("listener responded");
  rwcActionGazeAtPosition(peoplePos[0], peoplePos[1], peoplePos[2], 10);
  console.log(peoplePos);
  alert(peoplePos);
}

  async function talkingClock(){
    if(!talking){
      return;
    }
    self.postMessage(pivotSwitch);
    pivotSwitch *= -1;
    pInterval = 3;
    await sleep(pInterval*1000);
    talkingClock();
}
