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

function simPos(range, sub=true){
  return new Promise( resolve => {
    if(sub){
      var preempt;
      setTimeout(function(){preempt = true}, 20*1000);
      rwcListenerGetNearestPersonPosition(null, true).then(function(myTopic){
        myTopic.subscribe(function(msg){
          rwcListenerGetPosition().then(function(pos){
            //get positions based on /odom topics so offsetting huma pose readings relative to where the robot starts
            var compX = ((msg.pose.position.x -9) - pos[0]);
            //console.log(`x1: ${msg.pose.position.x} x2:${pos[0]}`);
            var compY = ((msg.pose.position.y-4) - pos[1]);
            //console.log(`y1: ${msg.pose.position.y} y2:${pos[1]}`);
            var dist = Math.sqrt(Math.pow(compX,2)+Math.pow(compY,2));
            
            console.log(`distance is; ${dist} components are ${compX} and ${compY}`);
            if((dist < range && dist >0) || preempt){
              myTopic.unsubscribe();
              resolve("found person: " + !preempt);
            }
          });
        });
      });
    }
    else{
      rwcListenerGetNearestPersonPosition().then(function(msg){
        rwcListenerGetPosition().then(function(pos){
          var compX = Math.pow((msg.pose.position.x - pos[0]),2);
          var compY = Math.pow((msg.pose.position.y - pos[1]),2);
          var dist = Math.sqrt(compX+compY);
          console.log(dist);
          resolve(dist);
        });
      });
    }
  });

}
function personSense(range, sub = true){
  return new Promise( resolve => {
    if (sub){
      console.log("waiting for person...");
      var preempt;
      setTimeout(function(){ preempt = true }, 20*1000); //times out the waiting after a minute.
      rwcListenerGetNearestDist(null, true).then(function(myTopic){
        myTopic.subscribe(function(msg){
          var dist;
          dist = msg.min_distance;
          console.log(dist);
          if((dist < range && dist >0) || preempt){
            myTopic.unsubscribe();
            resolve("found person: " + !preempt);
          }
        });
      });
    }
    else{
      rwcListenerGetNearestDist().then(function(dist){resolve(dist)});
    }
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
