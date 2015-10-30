var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var pubnub = require("pubnub")({
    publish_key   : "pub-c-####################################", // Your Publish Key
    subscribe_key : "sub-c-####################################"  // Your Subscriber Key
});

app.get('/', function(req, res) {
    var express = require('express');
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket) {
    socket.on('chatMessage', function(chroom, from, msg) {
        pubnub.publish({
            channel: chroom,        
            message: msg,
            callback : function(m){console.log(m)}
        });
        io.emit('chatMessage', chroom, from, msg);
    });
});

// Listen application request on port 3000
http.listen(3000, function() {
    console.log('listening on *:3000');
});