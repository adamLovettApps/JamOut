const SET_GENRES = 'genres/setGenres';


const setGenres = (genres) => ({
    type: SET_GENRES,
    payload: genres
});

export const getGenres = () => async(dispatch) => {
    const data = await fetch('/api/genres/');
    const genres = await data.json();
    dispatch(setGenres(genres))
    return;
}


const initialState = {all: []};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_GENRES:
            const genres = action.payload;
            return {
                ...state,
                all: genres
            };
        default:
            return state;
    }
}

export default reducer;