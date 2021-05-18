import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MessageInput.scss';

const MessageInput = ({chat}) => {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    const user = useSelector(state => state.authReducer.user);
    const socket = useSelector(state => state.chatReducer.socket);

    const handleMessage = ({target}) => {
        setMessage(target.value);

        // TODO: notify others
    }

    const handleKeyDown = ({key}, imageUpload = false) => {
        if(key === 'Enter') sendMessage(imageUpload);

        // TODO: notify others
    }

    const sendMessage = (imageUpload) => {
        if(message.length < 1 && !imageUpload) return;

        const msg = {
            type: imageUpload ? 'image' : 'text',
            fromUser: user,
            toUser: chat.Users.map(user => user.id),
            chatId: chat.id,
            message: imageUpload ? image : message
        };

        setMessage('');
        setImage('');

        // TODO: implement sockets
        socket.emit('message', msg);
    }

    return (
        <div id='input-container'>
            <div id='message-input'>
                <input 
                    value={message}
                    type='text' 
                    placeholder='Type a message...'
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e)}
                />
                <FontAwesomeIcon icon={['far', 'smile']} className='fa-icon'/>
            </div>
        </div>
    )
}

export default MessageInput;