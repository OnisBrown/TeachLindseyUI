const express = require('express'),
  cors = require('cors'),
  axios = require('axios')

server = express();
server.set('port', process.env.PORT || 4000);

//server routes
server.use(cors());
server.use(express.json())
server.use('/Scripts', express.static(__dirname + '/Scripts'));
server.use('/blockly', express.static(__dirname + '/blockly'));
server.use('/roswebcomponents', express.static(__dirname + '/roswebcomponents'));
server.use('/Assets', express.static(__dirname + '/Assets'));
server.use('/', express.static(__dirname + '/public'));
server.get('/', (request,response)=>{
  response.sendFile(__dirname + '/index.html'); //send index.html to client when landing on default page
});
server.get('/sim', (request,response)=>{
  response.sendFile(__dirname + '/sim.html'); //send sim.html to client when landing on default page
});

server.post('/STT',(request, response)=>{
  console.log(request.body);
  var userId = "guest";
  var address = `http://127.0.0.1:3000/api/v1/bots/chatty_lindsey/converse/${userId}?include=nlu,state,suggestions,decision`
  var msg = request.body;
  axios.post(address, msg).then((bpRes)=>{
    let temp = bpRes;
    //console.log(`response is: ${temp.data.nlu}`);
    //console.log(temp);
    response.json(temp.data.nlu);
  }).catch((error)=>{
    console.error(error);
  });
});

server.use((request,response)=>{
   response.type('text/plain');
   response.status(505);
   response.send('Error page');
});

server.listen(4000,()=>{
  console.log('Express server created at port 4000');
});
