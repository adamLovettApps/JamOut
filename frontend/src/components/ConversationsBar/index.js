import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConversations, setCurrentConversation } from '../../store/conversations';
import { setDisplay } from '../../store/messages';
import ChatWindow from '../ChatWindow';
import "./ConversationsBar.css";


const ConversationsBar = (socket) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const conversations = useSelector((state) => state.conversations.all);
    const displayValue = useSelector((state) => state.messages.display);
    const [loaded, setLoaded] = useState(false);
    const [sliderState, setSliderState] = useState("closed");

    useEffect(() => {
        dispatch(getUserConversations(user.id));
    }, [dispatch, user.id]);

    useEffect(() => {

        const interval = setInterval(() => {
            dispatch(getUserConversations(user.id));
        }, 10000);

        return () => clearInterval(interval);
        
    }, [dispatch, user.id])

    const setActiveConversation = (id) => {
        let conversation;
        for (let i = 0; i < conversations.length; i++) {
            if (conversations[i].id === id) {
                conversation = conversations[i];
            }
        }
        dispatch(getUserConversations(user.id));
        if ((conversation.UserId === user.id && conversation.newConversationUser1 === true)) {
            socket.socket.emit('acceptincoming', id);
        
        }

        if ((conversation.UserId2 === user.id && conversation.newConversationUser2 === true)) {
            socket.socket.emit('acceptincoming', id);
        }
        dispatch(setCurrentConversation(id, user.id));
        dispatch(setDisplay("inline"));
    }

    const handleSlider = () => {
        const conversationContainer = document.getElementById("conversations-bar-container");
        const sliderIcon = document.getElementById("slider-icon");
        console.log(conversationContainer)
        if (sliderState === "closed") {
            conversationContainer.style.right ="0px";
            sliderIcon.classList.remove("fa-chevron-left");
            sliderIcon.classList.add("fa-chevron-right");
            setSliderState("open");
        } else {
            conversationContainer.style.right = "-169px";
            sliderIcon.classList.remove("fa-chevron-right");
            sliderIcon.classList.add("fa-chevron-left");
            setSliderState("closed");
        }

    }

    return (
        <>
        <div id="conversations-bar-container" className="conversations-bar-container">
            <div className="slider-button" onClick={handleSlider}><i id="slider-icon" class="fas fa-chevron-left"></i></div>
            <div className="conversations-bar-conversations-container">
                {conversations.length && conversations.map((conversation => {
                    let bold;
                    const displayName = user.id === conversation.user1.id ? conversation.user2.username : conversation.user1.username;
                    if (user.id === conversation.user1.id && conversation.unreadUser1 === true) {
                        bold = true;
                    }
                    if (user.id === conversation.user2.id && conversation.unreadUser2 === true) {
                        bold = true;
                    }
                    if(bold) {
                    return (
                        <button 
                            key={conversation.id}
                            onClick={(() => setActiveConversation(conversation.id))}
                            className="conversation-button-bold"
                            
                        >
                            {displayName}
                        </button>
                    )
                    } else {
                        return (
                        <button 
                            key={conversation.id}
                            onClick={(() => setActiveConversation(conversation.id))}
                            className="conversation-button"
                            
                        >
                            {displayName}
                        </button>
                        )
                    
                    }
                }))
            }
                
            </div>
        
            
        </div>
        <ChatWindow socket={socket}></ChatWindow>
        </>
    )
}

export default ConversationsBar;