
const {sequelize} = require('../../models');

exports.getChattersIDs = async(userID) => {
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