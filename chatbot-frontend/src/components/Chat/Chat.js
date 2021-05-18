import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Navbar from './Navbar/Navbar';
import FriendList from './FriendList/FriendList';
import Messenger from './Messenger/Messenger';
import useSocket from './hooks/socketConnect';

import './Chat.scss';

const Chat = () => {
    const dispach = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    useSocket(user, dispach);

    return (
        <div id='chat-container'>
            <Navbar />
            <div id='chat-wrap'>
                <FriendList />
                <Messenger />
            </div>
        </div>
    )
}

export default Chat;