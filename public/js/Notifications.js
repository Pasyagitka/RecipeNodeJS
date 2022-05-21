let socket = io();
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});
socket.on('broad', function(data) {
    notifyMe(data.user, data.title);
});