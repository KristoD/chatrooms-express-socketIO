var express = require('express');
var session = require('express-session');
var app = express();

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(session({secret: 'a4f8071f-c873-4447-8ee2'}));

app.get('/', function(req, res) {
    res.render('index');
});

var server = app.listen(8000, function() {
    console.log("Server listening on port 8000...");
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    console.log('Socket connected to server');
    socket.on('got_a_new_user', function(data) { 
        users.push(data.username);
        io.emit('new_user', {username: data.username, socket_id: socket.id});
    });
    socket.on('disconnect', function(data) {
        io.emit('disconnect_user', {socket_id: socket.id});
        console.log('Socket disconnected from server');
    });
});
