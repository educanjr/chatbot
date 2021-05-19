import API from './api';

const ChatService = {
    fetchChats: () => {
        return API.get('/chats')
            .then(response => {
                if(response && response.data){
                    console.log('CHAT SERVICE', response.data);
                    return response.data;
                }

                return null;
            })
            .catch(err => {
                throw err;
            })
    },
}

export default ChatService;