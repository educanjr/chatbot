import {useEffect} from 'react';
import socketIOClient from 'socket.io-client';

function useSocket(user, dispatch) {
    useEffect(() => {
        const socket = socketIOClient.connect('http://127.0.0.1:5000')
    })
}