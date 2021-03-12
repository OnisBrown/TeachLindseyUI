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

function exhibitPos(range, exhibitcoord){
  return new Promise(resolve => {
    if(!pos){
      rwcListenerGetPosition().then(function(loc){
        var compX = ((msg.pose.pose.position.x) - exhibitcoord[0]);
        var compY = ((msg.pose.pose.position.y) - exhibitcoord[1]);
        var dist = distCalc(msg.pose.pose.position.x, exhibitcoord[0], msg.pose.pose.position.y, exhibitcoord[1])

        if((dist < range && dist >0) || preempt){
          myTopic.unsubscribe();
          resolve("found person: " + !preempt);
        }
      });
    }
    else{
      rwcListenerGetPosition().then(function(pos){
        var compX = ((msg.pose.pose.position.x) - exhibitcoord[0]);
        var compY = ((msg.pose.pose.position.y) - exhibitcoord[1]);
        var dist = distCalc(msg.pose.pose.position.x, exhibitcoord[0], msg.pose.pose.position.y, exhibitcoord[1]);
        console.log(dist);
        resolve(pos);
      });
    }
  });
}

//calculates disctance between two coordinates on the metric map, ignores z axis
function distCalc(x1,x2,y1,y2){
  var a = x1 - x2;
  var b = y1 - y2;
  console.log("x: " + a + " y: " + b);
  return(Math.sqrt(a*a + b*b));
}

function PerPos(range, sub=true, pos=false, sim=true){
    return new Promise( resolve => {
      if(sub){
        var preempt;
        setTimeout(function(){preempt = true}, 20*1000);
        rwcListenerGetNearestPersonPosition(null, true).then(function(myTopic){
          myTopic.subscribe(function(msg){
            rwcListenerGetPosition().then(function(pos){
              //get positions based on /odom topics so offsetting huma pose readings relative to where the robot starts
              if(sim){
                console.log(msg.pose.position);
                console.log(pos)
                var dist = distCalc((10.496 - msg.pose.position.x), pos[0], (3.778 - msg.pose.position.y), pos[1]);
                console.log("sim dist: " + dist);
              }
              else{
                var dist = distCalc(msg.pose.position.x, pos[0], msg.pose.position.y, pos[1]);
                console.log("person dist: " + dist);
              }
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
          if (pos){
            if(sim){
              msg[0]= 10.496-msg[0];
              msg[1]= 3.778-msg[1];
            }
            resolve(msg);
          }
          else{
            rwcListenerGetPosition().then(function(pos){
              if (sim){
                var dist = distCalc((10.496-msg[0]), pos[0], (3.778-msg[1]), pos[1]);
                console.log(dist);
              }
              else{
                var dist = distCalc(msg[0], pos[0], msg[1], pos[1])
                console.log(dist);
              }
              resolve(dist);
            });
          }
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
