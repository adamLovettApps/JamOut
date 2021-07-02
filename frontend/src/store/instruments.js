const SET_INSTRUMENTS = 'genres/setInstruments';


const setInstruments = (instruments) => ({
    type: SET_INSTRUMENTS,
    payload: instruments
});

export const getInstruments = () => async(dispatch) => {
    const data = await fetch('/api/instruments');
    const instruments = await data.json();
    dispatch(setInstruments(instruments))
    return;
}


const initialState = {all: []};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INSTRUMENTS:
            const instruments = action.payload;
            return {
                ...state,
                all: instruments
            };
        default:
            return state;
    }
}

export default reducer;