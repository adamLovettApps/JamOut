import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConversations, setCurrentConversation } from '../../store/conversations';
import ChatWindow from '../ChatWindow';
import "./ConversationsBar.css";


const ConversationsBar = (socket) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const conversations = useSelector((state) => state.conversations.all);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserConversations(user.id));
    }, [dispatch, user.id]);

    const setActiveConversation = (id) => {
        dispatch(setCurrentConversation(id));
    }

    return (
        <div>
        <div className="conversations-bar-container">
            {conversations.map((conversation => {
                const displayName = user.id === conversation.user1.id ? conversation.user2.username : conversation.user1.username;
                return (
                    <button 
                        key={conversation.id}
                        onClick={(() => setActiveConversation(conversation.id))}
                    >
                        {displayName}
                    </button>
                )
            }))};
            
        </div>
        <ChatWindow socket={socket}></ChatWindow>
        </div>
    )
}

export default ConversationsBar;