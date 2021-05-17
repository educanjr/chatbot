const { Op } = require('sequelize');
const { sequelize } = require('../models');
const models = require('../models');
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

exports.chats = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        include: [
            {
                model: Chat,
                include: [
                    {
                        model: User,
                        where: {
                            [Op.not]: {
                                id: req.user.id
                            }
                        }
                    },
                    {
                        model: Message,
                        include: [
                            {
                                model: User
                            }
                        ],
                        limit: 20,
                        order: [['id', 'DESC']]
                    }
                ]
            }
        ]
    });

    return res.json(user.Chats);
};

exports.create = async(req, res) => {
    const { friendId } = req.body;

    const t = await sequelize.transaction();

    try{
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: Chat,
                    where: {
                        type: 'dual'
                    },
                    include: [
                        {
                            model: ChatUser,
                            where: {
                                userId: friendId
                            }
                        }
                    ]
                }
            ]
        });

        if(user && user.Chats.lenth > 0) return res.status(403).json({messge: 'You already have a chat with this user.'});

        const chat = await Chat.create({ type: 'dual' }, { transaction: t });

        await ChatUser.bulkCreate([
            {
                chatId: chat.id,
                userId: req.user.id
            },
            {
                chatId: chat.id,
                userId: friendId
            } 
        ], { transaction: t });

        await t.commit();

        const createdChat = await Chat.findOne({
            where: {
                id: chat.id
            },
            include: [
                {
                    model: User,
                    where: {
                        id: req.user.id
                    }
                },
                {
                    model: Message
                }
            ]
        });

        return res.json(createdChat);

    } catch(err) {
        await t.rollback();
        return res.status(500).json({status: 'Error', message: err.message});
    }
}

exports.remove = async(req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({status: 'Error', message: 'Missing Chat ID on parameters.'});
    }
    
    const t = await sequelize.transaction();
    try{ 
        await ChatUser.destroy({
            where: {
                chatId: id
            }
        }, {transaction: t});

        await Chat.destroy({
            where: {
                id: id
            }
        }, {transaction: t});

        await t.commit();

        return res.json({ status: 'Success', message: 'Chat deleted successfully' })
    } catch(err) {
        await t.rollback();
        return res.status(500).json({status: 'Error', message: err.message});
    }
}