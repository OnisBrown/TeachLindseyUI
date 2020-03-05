const express = require('express'),

server = express();
server.set('port', process.env.PORT || 4000);

//server routes

server.get('/', (request,response)=>{
   response.send('Home page');
});

server.use((request,response)=>{
   response.type('text/plain');
   response.status(505);
   response.send('Error page');
});

server.listen(4000,()=>{
  console.log('Express server created at port 4000');
});
