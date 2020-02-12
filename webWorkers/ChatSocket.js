let localSocket = new WebSocket("wss://127.0.0.1:9002");
let chatSocket = new WebSocket("wss://127.0.0.1:3000");

localSocket.onopen = function(e){
  console.log("connected to self: " + e.data);
};

localSocket.onmessage = function(e){
  if(e.wasClean){
    console.log('message: ' + e.data);
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
  console.log('error: ' + e.data);
};

chatSocket.onopen = function(e){
  console.log("connected to botpress: " + e.data);
};

chatSocket.onmessage = function(e){
  if(e.wasClean){
    console.log('message: ' + e.data);
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
  console.log('error: ' + e.error);
};
