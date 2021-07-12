import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages, addMessage } from '../../store/messages';
import { addJoinedConversation } from '../../store/conversations';
import { setDisplay } from '../../store/messages';
import "./ChatWindow.css"

const ChatWindow = ({socket}) => {
    socket = socket.socket;
    const [message, setMessage] = useState("");
    const currentConversation = useSelector((state) => state.conversations.currentConversation);
    const messages = useSelector(state => state.messages[currentConversation]);
    const joinedConversations = useSelector(state => state.conversations.joinedConversations);
    const displayValue = useSelector((state) => state.messages.display);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const latestMessage = useRef(null);

    useEffect(() => {
        if (currentConversation) {
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

            dispatch(addMessage(incoming));
        });

        dispatch(addJoinedConversation(currentConversation));
    }, [currentConversation, joinedConversations, dispatch, socket])

    useEffect(() => {
        if (latestMessage.current) {
            latestMessage.current.scrollIntoView();
        }
    });

    useEffect(() => {
        dispatch(getAllMessages(currentConversation));
    }, [dispatch, currentConversation]);

    const sendMessage = message => {
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
        <>
        <div className="messaging-container" style={{display: displayValue}}>
            <div>
            {messages.map((message) => {
                return (
                    <div id={message.id} className="single-message-container" ref={latestMessage}>
                        <span className="single-message-username">{message.fromUsername}:</span> {message.text}
                    </div>
                    // {message.from.username}:
                )
            })}
            </div>
        </div>
        <div style={{display: displayValue}}>
            <form  className="send-message-form" onSubmit={submit}>
                <input className="form-field-input-message" onChange={((e) => setMessage(e.target.value))} type="text" value={message}></input>
                <button className="form-field-button-message" type="submit">Send</button>
            </form>
        </div>
        <div style={{display: displayValue}} className="close-messaging-button" onClick={(() => dispatch(setDisplay("none")))}><i className="fas fa-times-circle close-message"></i></div>

        </>
    )
}

export default ChatWindow;