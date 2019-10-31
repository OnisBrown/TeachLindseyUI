var talking;
var away = false;
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
  gInterval = 3;
  await sleep(gInterval*1000);
  if(!talking){
    return;
  }
  console.log("looking away" + away);
  self.postMessage(away);
  away = !away;
  gazingClock();
}
