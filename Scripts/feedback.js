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

function personSense(range, ){
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
