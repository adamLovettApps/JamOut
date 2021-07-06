import { fetch } from './csrf.js';

const SET_SEARCH_RESULTS = "search/setSearchResults";

const setSearchResults = (data) => ({
    type: SET_SEARCH_RESULTS,
    payload: data
});


export const getSearchResults = (chosenInstruments, chosenGenres, zip, radius) => async(dispatch) => {
    const res = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ chosenInstruments, chosenGenres, zip, radius })
    });

    // const data = await res.json()
    dispatch(setSearchResults(res.data));
    return;
}

export const restoreSearchResults = (chosenInstruments, chosenGenres, zip, radius) => async(dispatch) => {
    const res = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ chosenInstruments, chosenGenres, zip, radius })
    });
    dispatch(setSearchResults(res.data));
    return;
}

const initialState = { results: null, searchParameters: null};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                results: action.payload
            };
        default:
            return state;
    }
}

export default reducer;