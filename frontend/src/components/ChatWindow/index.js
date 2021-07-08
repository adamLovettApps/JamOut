import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages, addMessage } from '../../store/messages';
import { addJoinedConversation } from '../../store/conversations';
import "./ChatWindow.css"

const ChatWindow = ({socket}) => {
    socket = socket.socket;
    const [message, setMessage] = useState("");
    const currentConversation = useSelector((state) => state.conversations.currentConversation);
    const messages = useSelector(state => state.messages[currentConversation]);
    const joinedConversations = useSelector(state => state.conversations.joinedConversations);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const messageElement = useRef(null);

    useEffect(() => {
        if (currentConversation) {
            console.log(`joining ${currentConversation}`)
            socket.emit('join', currentConversation);
        }
    },[currentConversation, socket]);

    useEffect(() => {
        if (!currentConversation) {
            return;
        }
        if (joinedConversations.includes(currentConversation)) {
            return;
        }

            socket.on(currentConversation, (incoming) => {
            console.log(
                `Recieved new message for : ${incoming}`
            );
            console.log("MESSSSSSAGEEEEEE!", incoming);
            dispatch(getAllMessages(currentConversation));
        });

        dispatch(addJoinedConversation(currentConversation));
    }, [currentConversation, joinedConversations, dispatch, socket])

    useEffect(() => {
        if (messageElement.current) {
            messageElement.current.scrollIntoView();
        }
        console.log(socket);
    });

    useEffect(() => {
        dispatch(getAllMessages(currentConversation));
    }, [dispatch, currentConversation]);

    const sendMessage = message => {
        console.log(user.id);
        socket.emit(currentConversation, {
            message: message,
            id: user.id,
            username: user.username
        });
    }

    const submit = async (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    if (!messages) {
            return null;
    }

    return (
        <div className="messaging-container">
            {messages.map((message) => {
                return (
                    <div>
                        {message.fromUsername}: {message.text}
                    </div>
                    // {message.from.username}:
                )
            })}
            <form className="form" onSubmit={submit}>
                <input onChange={((e) => setMessage(e.target.value))} type="text" value={message}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatWindow;