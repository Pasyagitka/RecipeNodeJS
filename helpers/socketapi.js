const io = require("socket.io")();
const socketapi = {
    io: io
};

io.on('connection', function(client) {
    client.on('join', function(data) {
        client.on('recipe added', function(data) {
            client.broadcast.emit('broad', data); // will emit to all connected clients, except the socket itself.
        });
    });
});

module.exports = socketapi;