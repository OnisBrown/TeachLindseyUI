// Passive behaviours exhibited whilst performing other user callable actions

async function pivAsync(ang = 0, right = true){
  if (ang == 0){
    if (right){
      ang = 30;
    }
    else{
      ang = -30;
    }
  }
  pInterval = 5;
	if(!talking){
		return;
	}
  await sleep(pInterval*1000);
  if(talking){
    ang*= -1;
    quatCalc(ang);
    console.log(pivAway);
    pivAway = !pivAway
    // rwcActionSetPoseRelative(0, 0, 0, qtn).on("result", function(){
    //   pivAsync(ang);
    // });
    rwcActionSetPoseRelative(0, 0, 0, qtn);
    setTimeout(function(){if(talking){ pivAsync(ang);}}, 500);
  }
  else{
    console.log(pivAway);
    if (pivAway){
      ang*= -1;
      quatCalc(ang);
      rwcActionSetPoseRelative(0, 0, 0, qtn);
    }
    pivAway = false;
    return;
  }
}

async function gazeAsync(exhibit = false){
  gInterval = 4;
  if(talking){
    console.log("looking away: " + !away);
    if (away){
      rwcActionGazeAtNearestPerson(gInterval+3).on("result", function(){
        // away = !away;
        // gazeAsync();
        console.log("gaze result");
      });
      console.log("gazing at person: " + !away);
      away = !away;
      await sleep((gInterval+5)*1000);
			if(!talking){return;}
      gazeAsync(exhibit);
    }
    else{
      if(exhibit){
        rwcActionGazeAtPosition(curExhibitCoord[0],curExhibitCoord[1],curExhibitCoord[2],gInterval+5).on("result", function(){
          console.log("gaze result");
        });
        console.log("gazing at person: " + !away);
        away = !away;
				await sleep((gInterval+5)*1000);
        if(!talking){return;}
        gazeAsync(exhibit);
      }
      else{
        rwcListenerGetNearestPersonPosition(null, false).then(function(coord){
          rwcActionGazeAtPosition((coord[0]+0.5),(coord[1]+0.5),(coord[2]),gInterval+5).on("result", function(){
            console.log("gaze result");
          });
        });
        console.log("gazing at person: " + !away);
        away = !away;
        await sleep((gInterval+5)*1000);
				if(!talking){return;}
        gazeAsync(exhibit);
      }
    }
  }
  else{
    return;
  }
}
