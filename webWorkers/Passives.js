var talking = true;
var exhibAng = 90;

async function checkPeople(){
  console.log("calling listener");
  rwcActionGazeAtPosition(0, 1, 2, 10)
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

async function talkingAn(){
  quatCalc(exhibAng);
  if(talking){
    console.log("toggle" + talking + " " + exhibAng);
    rwcActionSetPoseRelative(0,0,0, qtn).on("result", function(status){exhibAng *= -1; talkingAn();});
  }
  else{
    return;
  }
}
