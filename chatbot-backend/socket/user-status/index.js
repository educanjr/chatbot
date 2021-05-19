const {getChattersIDs} = require('../../database/queries');

exports.disconectUser = async (io, client, userSockets, users) => {
    if(userSockets.has(client.id)){
        const user = users.get(userSockets.get(client.id));
        if(user.sockets.length > 1) {
            user.sockets = user.sockets.filter(item => {
                if(client.id !== item) return true;

                userSockets.delete(item);
                return false;
            });

            users.set(user.id, user);
        } else {
            const chatters = await getChattersIDs(user.id);

            // notify frieds
            for(let i = 0; i<chatters.length; i++){
                if(users.has(chatters[i])){
                    const chatter = users.get(chatters[i]);
                    chatter.sockets.forEach(friendSocket => {
                        try{
                            io.to(friendSocket).emit('offline', user);
                        } catch(e) {

                        }
                    });

                    friendOnline.push(chatter.id);
                }
            }

            userSockets.delete(client.id);
            users.delete(user.id);
        }
    }
};

exports.userJoin = async (io, client, userSockets, users, user) => {
    console.log('join user', user);
    let sockets = [];
    if(users.has(user.id)){
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[client.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[client.id]];
        userSockets.set(client.id, user.id);
    } else {
        users.set(user.id, {id: user.id, sockets: [client.id]});
        sockets.push(client.id);
        userSockets.set(client.id, user.id);
    }

    const friendOnline = [];
    const chatters = await getChattersIDs(user.id);

    // notify frieds
    for(let i = 0; i<chatters.length; i++){
        if(users.has(chatters[i])){
            const chatter = users.get(chatters[i]);
            chatter.sockets.forEach(firendSocket => {
                try{
                    io.to(firendSocket).emit('online', user);

                } catch(e) {

                }
            });

            friendOnline.push(chatter.id);
        }
    }

    sockets.forEach(firendSocket => {
        try{
            io.to(firendSocket).emit('friends', friendOnline);
        } catch(e) {

        }
    });

    io.to(client.id).emit('typing', 'User typing...')
} 