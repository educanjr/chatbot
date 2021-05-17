import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Navbar from './Navbar/Navbar';
import FriendList from './FriendList/FriendList';
import Messenger from './Messenger/Messenger';
import {fetchChats} from '../../store/actions/chat';

import './Chat.scss';

const Chat = () => {
    const dispach = useDispatch();
    useEffect(() => {
        dispach(fetchChats());
    }, [dispach]);

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