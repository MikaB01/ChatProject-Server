const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');
const bookshelf = require('./database');

app.use(bodyParser.json());

require('./src/model/rooms');

const Room = bookshelf.model('Rooms');

app.route('/').get((req, res) => {
    res.send("ChatProject-Server is running!");
});

io.on('connection', (socket) => {
    console.log("User has connected:", socket.id);

    socket.on('join room', (room) => {
        socket.join(room);
        io.to(room).emit('emit', room);
    });

    socket.on('create room', (room) => {
        io.emit('emit', room);
    });

    socket.on('leave room', (id) => {
        socket.leave('room'+id);
    });

    socket.on('chat message', (msg, id) => {
        console.log('room'+id+'|'+msg);
        io.to('room'+id).emit('emit', msg);
    });

    socket.on('disconnect', () => {
        console.log("User has disconnected:", socket.id);
    });

    socket.emit('emit', 'Just a message to all Clients');
});

server.listen(5000, () => {
    console.log("Server stated!\nListening prot: 5000");
});