const socketsIo = require('socket.io');

const SocketServer = (server) => {
    const io = socketsIo(server);

    io.on('join', async(user) => {
        console.log("New user joined: ", user.firstName);
    })
}

module.exports = SocketServer;