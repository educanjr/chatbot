import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userStatus } from '../../../utils/helpers';

import './ChatHeader.scss';

const ChatHeader = ({chat}) => {
    const [showSettings, setShowSettings] = useState(false);
    // const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    // const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
    // const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);

    return (
        <>
            <div id='chatter'>
                {
                    chat.Users.map(user => {
                        return (
                            <div className='chatter-info' key={user.id}>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div className='chatter-status'>
                                    <span className={`online-status ${userStatus(user)}`}></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <FontAwesomeIcon icon='ellipsis-h' className='fa-icon' onClick={() => setShowSettings(!showSettings)}/>
            {
                showSettings &&
                <div id='settings'>
                    <div>
                        <FontAwesomeIcon icon='user-plus' className='fa-icon'/>
                        <p>Add user</p>
                    </div>
                    {
                        chat.type !== 'dual' &&
                        <div>
                            <FontAwesomeIcon icon='sign-out-alt' className='fa-icon'/>
                            <p>Leave chat</p>
                        </div>
                    }
                    <div>
                        <FontAwesomeIcon icon='trash' className='fa-icon'/>
                        <p>Delete chat</p>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatHeader;