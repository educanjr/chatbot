import {useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import {fetchChats, onlineFriends, offlineFriend, onlineFriend, setSocket, receivedMsg} from '../../../store/actions/chat';

function useSocket(user, dispatch) {
    useEffect(() => {
        dispatch(fetchChats())
        .then(res => {
            console.info('CHAT GETTED', res);
            const socket = socketIOClient('http://127.0.0.1:5000', {path: "/chat-socket/"});
            console.info('SOCKET CREATED', socket);
            dispatch(setSocket(socket));

            socket.emit('join', user);

            socket.on('typing', (user) => {
                console.log("Event typing", user);
            });

            socket.on('friends', (friends) => {
                console.log("Event friends", friends);
                dispatch(onlineFriends(friends));
            });

            socket.on('online', (user) => {
                console.log("Event online", user);
                dispatch(onlineFriend(user));
            });

            socket.on('offline', (user) => {
                console.log("Event offline", user);
                dispatch(offlineFriend(user));
            });

            socket.on('received', (msg) => {
                console.log("Event received", msg);
                dispatch(receivedMsg(msg, user.id));
            });
        });
        
    }, [dispatch, user])
}

export default useSocket;