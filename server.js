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

app.listen(5000, () => {
    console.log("Server stated!\nListening prot: 5000");
})