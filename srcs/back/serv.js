const fastify = require('fastify')();
const websocket = require('@fastify/websocket');

fastify.register(websocket);

// Route WebSocket pour le pong
fastify.get('/ws/pong', { websocket: true }, (connection, req) => {
    console.log('Client connected');
    connection.socket.on('message', message => {
        const data = JSON.parse(message);
        if (data.action === 'move_up') {
            console.log('Move paddle up');
        } else if (data.action === 'move_down') {
            console.log('Move paddle down');
        }
    });

    connection.socket.on('close', () => {
        console.log('Client disconnected');
    });
});

fastify.listen({ port: 3000 }, err => {
    if (err) throw err;
    console.log('Server running on http://localhost:3000');
});
