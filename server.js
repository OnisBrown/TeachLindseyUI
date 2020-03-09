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

server.post('/STT',(request, response)=>{
  console.log(request.body);
  var userId = "guest";
  var address = `http://10.5.42.157:3000/api/v1/bots/chatty_lindsey/converse/${userId}/secured?include=nlu,state,suggestions,decision`
  var msg = request.body;
  axios.post(address, msg).then((bpRes)=>{
    console.log(`${bpRes.statusCode}`);
    response.json(bpRes);
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
