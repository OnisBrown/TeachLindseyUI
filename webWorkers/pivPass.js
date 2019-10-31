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
      break;
  }
}

async function gazingClock(){

}

async function talkingClock(){
  pInterval = 7;
  await sleep(pInterval*1000);
  if(!talking){
    return;
  }
  self.postMessage(pivotSwitch);
  pivotSwitch *= -1;

  talkingClock();
}
