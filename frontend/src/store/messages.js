const ADD_MESSAGE = "messages/add_message";
const SET_MESSAGES = "messages/set_message";

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
});

const setMessages = (messages, conversation) => ({
    type: SET_MESSAGES,
    payload: {
        messages: messages,
        conversation: conversation
    }
});

export const getAllMessages = (id) => async(dispatch) => {
    const res = await fetch(`/api/conversations/messages/${id}`);
    const conversation = await res.json();
    console.log(conversation)
    dispatch(setMessages(conversation.Messages, conversation));
};

const initialState = {};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            const message = action.payload;
            const previousMessages = state[message.ConversationId] ? state[message.ConversationId] : [];
            return {
                ...state,
                [message.ConversationId]: [...previousMessages, action.payload]
            }
        case SET_MESSAGES:
            const { messages, conversation } = action.payload;
            console.log(messages, "messages");
            return {
                ...state,
                [conversation.id]: messages
            };
        default:
            return state;
    }
}

export default reducer;