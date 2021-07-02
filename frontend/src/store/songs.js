const SET_SONG = "songs/set_song";

const setSongs = (song) => ({
    type: SET_SONG,
    payload: song
});

export const setCurrentSong = (song) => async(dispatch) => {
    dispatch(setSongs(song));
    return;
};

const initialState = {currentSong: null}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SONG:
            return {
                currentSong: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;