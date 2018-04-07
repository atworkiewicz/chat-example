var frontendApp = require('express')();
var frontendHttp = require('http').Server(frontendApp);
var io = require('socket.io')(frontendHttp);
var frontedPort = process.env.PORT || 3000;

var http = require('http');
var backendApp = require('express')();
var backendHttp = require('http').Server(backendApp);
var backendPort = process.env.BACKEND_PORT || 3001;

frontendApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var conn = io.on('connection', function(socket){});

frontendHttp.listen(frontedPort, function(){
  console.log('listening on *:' + frontedPort);
});

backendApp.all('/', function(req, res){
  res.end('OK');
});

var server = http.createServer(backendApp);
server.on('connection', function(socket) {
  conn.emit('beggining');
  socket.on('data', function(chunk) {
    conn.emit('data', chunk.toString());
  });

});
server.listen(backendPort, function(){
  console.log('listening on *:' + backendPort);
});
