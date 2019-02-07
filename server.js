const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

app.route('/').get((req, res) => {
    res.send("ChatProject-Server is running!");
});

io.on('connection', (socket) => {
    console.log("User has connected:", socket.id);

    socket.on('room', (room) => {
        socket.join(room);
        io.to(room).emit('emit', room);
    });

    socket.on('disconnect', () => {
        console.log("User has disconnected:", socket.id);
    });

    socket.emit('emit', 'Just a message to all Clients');
});

server.listen(5000, () => {
    console.log("Server stated!\nListening prot: 5000");
});