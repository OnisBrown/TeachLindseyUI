let localSocket = new WebSocket("wss://127.0.0.1:9002");
let chatSocket = new WebSocket("wss://127.0.0.1:3000");

localSocket.onopen = function(e){
  console.log("connected to self: " + e);
};

localSocket.onmessage = function(e){
  if(e.wasClean){
    console.log('message: ' + e);
  }
}

localSocket.onclose = function(e){
  if(e.wasClean){
    console.log('connection closed cleanly');
  }
  else{
    console.log("connection died");
  }
}

localSocket.onerror = function(e) {
  console.log('message: ' + e);
};

chatSocket.onopen = function(e){
  console.log("connected to botpress: " + e);
};

chatSocket.onmessage = function(e){
  if(e.wasClean){
    console.log('message: ' + e);
  }
}

chatSocket.onclose = function(e){
  if(e.wasClean){
    console.log('connection closed cleanly');
  }
  else{
    console.log("connection died");
  }
}

chatSocket.onerror = function(e) {
  console.log('message: ' + e);
};
