const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bookshelf = require('./database');

app.use(cors());
app.use(bodyParser.json());

app.set('bookshelf', bookshelf);
app.set('express', express);

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

const MODELS_DIR = `${__dirname}/src/model/`;
  fs.readdirSync(MODELS_DIR)
    .filter(file => path.extname(file) === '.js')
    .forEach(file => bookshelf.model(file.split('.')[0], require(MODELS_DIR + file)(app)));

const CONTROLLERS_DIR = `${__dirname}/src/controller/`;
  fs.readdirSync(CONTROLLERS_DIR)
    .filter(file => path.extname(file) === '.js')
    .forEach(file => require(CONTROLLERS_DIR + file)(app));

server.listen(5000, () => {
    console.log("Server stated!\nListening prot: 5000");
});