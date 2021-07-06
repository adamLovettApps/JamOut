import { fetch } from "./csrf.js";
const SET_USER = "user/get_user";
const ADD_SONG = "user/add_song";
const UPDATE_USER = "user/update_user";

const addSong = (song) => ({
    type: ADD_SONG,
    payload: song
});

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
})

export const getUser = (id) => async(dispatch) => {
    const {data} = await fetch(`/api/users/${id}`);
    console.log("DATA!!!", data)
    dispatch(setUser(data));
    return;
};

export const getNewUserInformation = (id, city, state, zip, bio, chosenInstruments, chosenGenres) => async(dispatch) => {
    const newUser = await fetch('/api/users/updateUser', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id, city, state, zip, bio, chosenInstruments, chosenGenres})
    });

    console.log(newUser.data);
    dispatch(updateUser(newUser.data));
}

export const addASong = (formData) => async(dispatch) => {
    const {data} = await fetch('/api/songs', {
    method: 'POST',
        headers: {
        "Content-Type": "multipart/form-data",
        },
        body: formData
    });

    console.log(" RESPONSE", data.song);
    dispatch(addSong(data.song))

};

export const removeASong = (userId, id) => async(dispatch) => {
    const user = await fetch(`/api/songs/${userId}/${id}`, {
        method: "DELETE"
    });

    dispatch(updateUser(user.data));
}



const initialState = {currentUser: null};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case ADD_SONG: 
            const newSongs = state.currentUser.Songs;
            newSongs.push(action.payload)
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    Songs: newSongs
                }
            }
        case UPDATE_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
};

export default reducer;