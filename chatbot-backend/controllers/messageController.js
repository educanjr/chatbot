const models = require('../models');
const User = models.User;
const Message = models.Message;

exports.messages = async(req, res) => {
    const {id, page: startPage} = req.query;
    if(!id){
        return res.status(400).json({status: 'Error', message: 'Missing Chat ID on query parameters.'});
    }

    const limit = 10;
    const page = startPage || 1;
    const offset = page > 1 ? page * limit : 0;

    const messages = await Message.findAndCountAll({
        where: {
            chatId: id
        },
        include: [
            {
                model: User
            }
        ],
        limit,
        offset
    });

    const totalPages = Math.ceil(messages.count / limit);

    if(page > totalPages) return res.json({ data: {messages: [] } });

    const result = {
        messages: messages.rows,
        pagination: {
            page,
            totalPages
        }
    };

    return res.json(result);
};