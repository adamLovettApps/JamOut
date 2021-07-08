const GET_CONVERSATIONS = "conversations/get_conversations";
const ADD_JOINED_CONVERSATION = "conversations/add_joined_conversation";
const SET_CURRENT_CONVERSATION = "conversations/set_current_conversation";

const getConversations = conversations => ({
    type: GET_CONVERSATIONS,
    payload: conversations
});

export const addJoinedConversation = conversation => ({
    type: ADD_JOINED_CONVERSATION,
    payload: conversation
});

export const setCurrentConversation = conversation => ({
    type: SET_CURRENT_CONVERSATION,
    payload: conversation
});

export const getUserConversations = (id) => async(dispatch) => {
    const data = await fetch(`/api/conversations/${id}`);
    const conversations = await data.json();
    dispatch(getConversations(conversations));
    return;
}



const initialState = {all: [], joinedConversations: [], currentConversation: null}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                all: action.payload
            }
        case SET_CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: action.payload
            }
        case ADD_JOINED_CONVERSATION:
            return {
                ...state,
                joinedConversations: [...state.joinedConversations, action.payload]
            }
        default:
            return state;
    }

}

export default reducer;