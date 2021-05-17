import React from 'react';
import { useSelector } from 'react-redux';

import { userStatus } from '../../../utils/helpers';

import './Friend.scss';

const Friend = ({chat, click}) => {
    const currentChat = useSelector(state => state.chatReducer.currentChat);

    const isChatOpened = () => {
        console.log(currentChat, chat.id);
        return currentChat && currentChat.id === chat.id ? 'openned' : ''
    }

    const lastMessage = () => {
        if(chat.Messages || chat.Messages.length <= 0) return '';

        const message = chat.Messages[chat.Messages.length - 1];
        return message.type === 'image' ? 'View image' : message.message;
    }

    return (
        <div className={`friend-list ${isChatOpened()}`} onClick={() => click(chat)}>
            <div className='friend-info'>
                <img width='20' height='20' src={chat.Users[0].avatar} alt='User avatar'/>
                <h4 className='m-0'>{chat.Users[0].firstName} {chat.Users[0].lastName}</h4>
                <h5 className='m-0'>{lastMessage()}</h5>
            </div>
            <div className='friend-status'>
                <span className={`online-status ${userStatus(chat.Users[0])}`}></span>
            </div>
        </div>
    )
}

export default Friend;