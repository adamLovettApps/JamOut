const SET_USER = "user/get_user";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const getUser = (id) => async(dispatch) => {
    const data = await fetch(`/api/users/${id}`);
    const user = await data.json();

    dispatch(setUser(user));
    return;
}

const initialState = {currentUser: null};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
};

export default reducer;