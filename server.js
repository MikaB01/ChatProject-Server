const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

require('./src/model/rooms');
app.use(require('./src/controller/room_controler'));

app.route('/').get(async(req, res) => {
    res.json('chatProject-Server is running');
});


io.on('connection', (socket) => {
    console.log("User has connected:", socket.id);

    socket.on('join room', (roomId) => {
        socket.join(roomId);
        io.to(roomId).emit('emit', socket.id + " has joind!");
    });

    socket.on('leave room', (roomId) => {
        socket.leave(roomId);
    });

    socket.on('chat message', (msg, roomId) => {
        io.to(roomId).emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log("User has disconnected:", socket.id);
    });

});

server.listen(5000, () => {
    console.log("Server stated!\nListening prot: 5000");
});