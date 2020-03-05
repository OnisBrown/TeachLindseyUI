const express = require('express'),
  cors = require('cors')

server = express();
server.set('port', process.env.PORT || 4000);

//server routes
server.use(cors());
server.use('/Scripts', express.static(__dirname + '/Scripts'));
server.use('/blockly', express.static(__dirname + '/blockly'));
server.use('/roswebcomponents', express.static(__dirname + '/roswebcomponents'));
server.use('/Assets', express.static(__dirname + '/Assets'));
server.use('/', express.static(__dirname + '/public'));
server.get('/', (request,response)=>{
  response.sendFile(__dirname + '/index.html'); //send index.html to client when landing on default page
});

server.post('/STT',(request, response)=>{
  console.log("request made to STT");
  response.json({test:'succeeded'});
});

server.use((request,response)=>{
   response.type('text/plain');
   response.status(505);
   response.send('Error page');
});

server.listen(4000,()=>{
  console.log('Express server created at port 4000');
});
