var talking;
var away
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



self.onmessage = function(event){
  switch(event.data){
    case "speaking":
      talking = true;
      gazingClock();
      break;
    case "stopSpeaking":
      talking = false;
      break
  }
}

async function gazingClock(){
  if(!talking){
    return;
  }
  self.postMessage(pivotSwitch);
  pivotSwitch *= -1;
  pInterval = 3;
  await sleep(pInterval*1000);
  gazingClock();
}
