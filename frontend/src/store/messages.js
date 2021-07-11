const ADD_MESSAGE = "messages/add_message";
const SET_MESSAGES = "messages/set_message";
const SET_DISPLAY = "messages/set_display";

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
});

export const setDisplay = value => ({
    type: SET_DISPLAY,
    payload: value
})

const setMessages = (messages, conversation) => ({
    type: SET_MESSAGES,
    payload: {
        messages: messages,
        conversation: conversation
    }
});

export const getAllMessages = (id) => async(dispatch) => {
    if (id) {
        const res = await fetch(`/api/conversations/messages/${id}`);
        const conversation = await res.json();
        console.log(conversation)
        dispatch(setMessages(conversation.Messages, conversation));
    }
};

const initialState = {display: "none"};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            const message = action.payload;
            console.log("MESSAGE", message);
            const previousMessages = state[message.ConversationId] ? state[message.ConversationId] : [];
            return {
                ...state,
                [message.ConversationId]: [...previousMessages, action.payload]
            }
        case SET_MESSAGES:
            const { messages, conversation } = action.payload;
            return {
                ...state,
                [conversation.id]: messages
            };
        case SET_DISPLAY:
            return {
                ...state,
                display: action.payload
            }
        default:
            return state;
    }
}

export default reducer;