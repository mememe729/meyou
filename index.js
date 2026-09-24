const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  socket.on('chat message', (data) => {
    const payload = {
      nick: data.nick || '匿名用户',
      msg: data.msg || ''
    };
    io.emit('chat message', payload);
  });

  socket.on('disconnect', () => {
    console.log('用户断开:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('聊天室已启动，端口:', PORT);
});
