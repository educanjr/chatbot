import React from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from '../ChatHeader/ChatHeader';

import './Messenger.scss';

const Messenger = () => {
    const chat = useSelector(state => state.chatReducer.currentChat);

    const activeChat = () => {
        return chat && Object.keys(chat).length > 0
    }

    return (
        <div id='messenger' className='shadow-light'>
            {
                activeChat() ?
                (
                <div>
                    <ChatHeader chat={chat}/>
                </div>
                )
                : <p>No open chats</p>
            }
        </div>
    )
}

export default Messenger;