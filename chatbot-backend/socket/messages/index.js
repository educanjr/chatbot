const Message = require('../../models').Message;
const BotTracer = require('../../models').BotTracer;
const {evaluateBotCommands, getBotResponse} = require('./bot');

const MessageTypes = {
    TEXT: 'text',
    IMAGE: 'image',
    BOT: 'bot',
}

exports.incomingMessage = async (io, client, msg, users) => {
    let distributionSockets = [];
    if(users.has(msg.fromUser.id)) {
        distributionSockets = users.get(msg.fromUser.id).sockets;
    }

    try {
        msg.User = msg.fromUser;
        msg.fromUserId = msg.fromUser.id;
        delete msg.fromUser;

        const botCommands = msg.type === MessageTypes.TEXT && msg.message.startsWith('!') ? evaluateBotCommands(msg.message) : undefined
        if(botCommands) {
            await distributeBotMessage(io, botCommands, msg, distributionSockets);
        } else {
            await distributeStandardMessage(io, users, msg, distributionSockets);
        }
    } catch(err) {
        console.error('incomingMessage', err.message)
    }
};

const distributeStandardMessage = async (io, users, msg, distributionSockets) => {
    msg.toUser.forEach(id => {
        if(users.has(id)) {
            distributionSockets = [...distributionSockets, ...users.get(id).sockets];
        }
    });

    const message = {
        type: msg.type,
        fromUserId: msg.User.id,
        chatId: msg.chatId,
        message: msg.message
    };

    const savedMsg = await Message.create(message);

    msg.id = savedMsg.id;

    distributionSockets.forEach(friendSocket => {
        io.to(friendSocket).emit('received', msg);
    });
};

const distributeBotMessage = async (io, botCommands, msg, distributionSockets) => {
    const botResponse = await getBotResponse(botCommands.command, botCommands.params);
    console.log('botResponse', botResponse);
    const message = {
        type: MessageTypes.BOT,
        fromUserId: msg.User.id,
        chatId: msg.chatId,
        message: botResponse,
    };

    const savedMsg = await Message.create(message);

    const botMessage = {
        ...msg,
        type: MessageTypes.BOT,
        message: botResponse,
        toUser: [msg.User.id],
        id: savedMsg.id
    };

    const botTrace = {
        command: botCommands.command,
        params: JSON.stringify(botCommands.params),
        message: botResponse,
        chatId: msg.chatId,
        userId: msg.User.id
    };

    await BotTracer.create(botTrace);

    distributionSockets.forEach(friendSocket => {
        io.to(friendSocket).emit('received', botMessage);
    });
};