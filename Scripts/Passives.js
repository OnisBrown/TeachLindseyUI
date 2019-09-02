var idle;

async function idleAn(){
  var peoplePos;
  rwcListenerGetPeoplePositions().then(function(value){peoplePos = value});
  i = 0;
  if(idle==true){
    rwcActionGazeAtPosition(peoplePos[i][0] , peoplePos[i][1] , peoplePos[i][2], 3);
  }
}
