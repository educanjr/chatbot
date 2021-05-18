const socketIo = require('socket.io');
const {sequelize} = require('../models');
require('events').EventEmitter.defaultMaxListeners = 1000;

const Message = require('../models').Message;

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
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on('join', async(user) => {
            console.log('join user', user);
            let sockets = [];
            if(users.has(user.id)){
                const existingUser = user.get(user.id);
                existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
                users.set(user.id, existingUser);
                sockets = [...existingUser.sockets, ...[socket.id]];
                userSockets.set(socket.id, user.id);
            } else {
                users.set(user.id, {id: user.id, sockets: [socket.id]});
                sockets.push(socket.id);
                userSockets.set(socket.id, user.id);
            }

            const friendOnline = [];
            const chatters = await getChatters(user.id);

            // notify frieds
            for(let i = 0; i<chatters.length; i++){
                if(users.has(chatters[i])){
                    const chatter = users.get(chatters[i]);
                    chatter.sockets.forEach(socket => {
                        try{
                            socket.to(socket).emit('online', user);

                        } catch(e) {

                        }
                    });

                    friendOnline.push(chatter.id);
                }
            }

            sockets.forEach(socket => {
                try{
                    socket.to(socket).emit('friends', friendOnline);
                } catch(e) {

                }
            });
    
            socket.to(socket.id).emit('typing', 'User typing...')
        });

        socket.on('message', async (msg) => {
            console.log('message', msg);
            let sockets = [];
            if(users.has(msg.fromUser.id)) {
                sockets = users.get(msg.fromUser.id).sockets;
            }

            msg.toUser.forEach(id => {
                if(users.has(id)) {
                    sockets = [...sockets, ...users.get(id).sockets];
                }
            });

            try {
                const message = {
                    type: msg.type,
                    fromUserId: msg.fromUser.id,
                    chatId: msg.chatId,
                    message: msg.message
                };

                const savedMsg = await Message.create(message);

                msg.User = msg.fromUser;
                msg.fromUserId = msg.fromUser.id;
                msg.id = savedMsg.id;
                delete msg.fromUser;

                console.log('RECEIVED MSG', msg);
                console.log('RECEIVED SOCKETS', sockets);
                sockets.forEach(socket => {
                    socket.to(socket).emit('received', msg);
                });
            } catch(err) {

            }
        });

        socket.on('disconnect', async () => {
            if(userSockets.has(socket.id)){
                const user = users.get(userSockets.get(socket.id));
                if(user.sockets.length > 1) {
                    user.sockets = user.sockets.filter(item => {
                        if(socket.id !== item) return true;

                        userSockets.delete(item);
                        return false;
                    });

                    users.set(user.id, user);
                } else {
                    const chatters = await getChatters(user.id);

                    // notify frieds
                    for(let i = 0; i<chatters.length; i++){
                        if(users.has(chatters[i])){
                            const chatter = users.get(chatters[i]);
                            chatter.sockets.forEach(socket => {
                                try{
                                    socket.to(socket).emit('offline', user);

                                } catch(e) {

                                }
                            });

                            friendOnline.push(chatter.id);
                        }
                    }

                    userSockets.delete(socket.id);
                    users.delete(user.id);
                }
            }
        });
    });
}

const getChatters = async(userID) => {
    try{
        const [result, metadata] = await sequelize.query(`
            select cu.userId from chat_db.chatusers as cu 
            inner join (
                select c.id from chat_db.chats as c where exists (
                    select u.id from chat_db.users as u
                    inner join chat_db.chatusers on u.id = chat_db.chatusers.userId
                    where u.id = ${parseInt(userID)} and c.id = chat_db.chatusers.chatId
                )
            ) as cselect on cselect.id = cu.chatId
            where cu.userId != ${parseInt(userID)}
        `);

        return result.length > 0 ? result.map(el => el.userID) : [];
    } catch(err) {
        console.error(err);
        return [];
    }
}

module.exports = SocketServer;