let localSocket = new WebSocket("wss://127.0.0.1:9002");
let chatSocket = new WebSocket("wss://127.0.0.1:3000")
localsocket.onopen = function(e){
  console.log(e);
};

localsocket.onmessage = function(e){
  if(e.wasClean){
    console.log('message: ${e.data}');
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
