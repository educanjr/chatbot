import React from 'react';
import { useSelector } from 'react-redux';

import Message from '../Message/Message';

import './MessageBox.scss';

const MessageBox = ({chat}) => {
    const user = useSelector(state => state.authReducer.user);

    return (
        <div id='msg-box'>
            {
                chat.Messages.map((msg, indx) => {
                    return <Message user={user} chat={chat} msg={msg} key={msg.id} indx={indx} />
                })
            }
        </div>
    )
}

export default MessageBox;