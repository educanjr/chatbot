const socketIo = require('socket.io');
require('events').EventEmitter.defaultMaxListeners = 1000;

const {getChattersIDs} = require('../database/queries');
const {incomingMessage} = require('./messages');
const {disconectUser, userJoin} = require('./user-status');

const users = new Map();
const userSockets = new Map();

const SocketServer = (server) => {
    const io = socketIo(server,
    {
        cors: {
          origin: "*"
        },
        maxHttpBufferSize: 1e8,
        path: "/chat-socket/"
    });

    io.on('connection', (socket) => {
        socket.on("connect_error", (err) => {
            console.error(`connect_error due to ${err.message}`);
        });

        socket.on('join', async(user) => {
            await userJoin(io, socket, userSockets, users, user);
        });

        socket.on('message', async (msg) => {
            await incomingMessage(io, socket, msg, users);
        });

        socket.on('disconnect', async () => {
            await disconectUser(io, socket, userSockets, users);
        });
    });
}



module.exports = SocketServer;