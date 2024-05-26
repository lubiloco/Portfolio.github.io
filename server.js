// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for new messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to everyone
    });

    // Notify when a user is typing
    socket.on('typing', (user) => {
        socket.broadcast.emit('typing', user);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
