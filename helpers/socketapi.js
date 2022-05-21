const io = require("socket.io")();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
// io.on( "connection", function( socket ) {
//     console.log( "A user connected" );
// });

// io.on('connection', function(socket){
//     console.log('We have a user connected !');
//     socket.on('comment added',function(data){
//         socket.broadcast.emit("notify everyone",{user : data.user,comment : data.comment});
//     });
// });

io.on('connection', function(client) {
    client.join("admin");
    //console.log('Client connected...', client.server.eio.clients);
    client.on('join', function(data) {
        //console.log(data);
        client.on('recipe added', function(data) {
            client.to("admin").emit('broad', data);
            //console.log(client);
            //client.broadcast.emit('broad',data); // will emit to all connected clients, except the socket itself.
        });
    });
});

module.exports = socketapi;