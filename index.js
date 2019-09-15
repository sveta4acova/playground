const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app); //???
const io = require('socket.io')(server);

server.listen(8163);

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

let users = [];
let connections = [];

io.on('connection', function(socket) {
  console.log('Соединение установлено');
  connections.push(socket);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Соединение прервано');
  });

  socket.on('send mess', function(data) {
    io.emit('add mess', data);
  })
});