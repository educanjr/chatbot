import React from 'react';

import './Message.scss';

const Message = ({user, chat, msg, indx}) => {
    const getMargin = () => {
        const nextIndx = indx + 1;
        if(nextIndx === chat.Messages.length) return '';

        return msg.fromUserId === chat.Messages[nextIndx].fromUserId ? 'mb-5' : 'mb-10'
    }

    const isMine = msg.fromUserId === user.id;

    return (
        <div className={`message ${getMargin()} ${isMine ? 'creator' : ''}`}>
            <div className={isMine ? 'owner' : 'other-person'}>
                {
                    !isMine &&
                    <h6 className='m-0'>{msg.User.firstName} {msg.User.lastName}</h6>
                }
                {
                    msg.type === 'text'
                    ? <p className='m-0'>{msg.message}</p>
                    : <img src={msg.message} alt='Message'/>
                }
            </div>
        </div>
    )
}

export default Message;