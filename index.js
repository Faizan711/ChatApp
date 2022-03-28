const io = require('socket.io')(8000);

const users = {};
// we use io.on for different connections which will come in the app as the user then the socket.on will make a function run for every user-joined and perform the function
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        // console.log('new user', name );
        users[socket.id] = name;
        // this socket.broadcast.emit emits a message to everyone in app except for the one who has joined now to notify that it has joined the chat too
        socket.broadcast.emit('user-joined', name);
    });
        // this function fires when anyone sends a message in the chat app
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message : message, name : users[socket.id]});
    });
    // this event fires when any one leaves the chat app
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        })
})