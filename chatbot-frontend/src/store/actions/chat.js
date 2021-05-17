import ChatService from '../../services/chatService';
import { FETCH_CHATS, SET_CURRENT_CHAT } from '../types/index';

export const fetchChats = (params, history) => dispatch => {
    return ChatService.fetchChats()
        .then(data => {
            data.forEach(chat => {
                chat.Users.forEach(user => {
                    user.status = 'offline';
                });
                chat.Messages.reverse();
            });

            dispatch({type: FETCH_CHATS, payload: data});
        })
        .catch(err => {
            throw(err);
        });
}

export const setCurrentChat = (chat) => dispatch => {
    dispatch({type: SET_CURRENT_CHAT, payload: chat});
}
