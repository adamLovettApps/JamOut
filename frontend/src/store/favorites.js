import { fetch } from "./csrf";

const SET_FAVORITES = "favorite/SET_FAVORITES";

const setFavorites = (favorites) => ({
    type: SET_FAVORITES,
    payload: favorites
})


export const getAllFavorites = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/getFavorites/${id}`);
    if (response.ok){
        
        dispatch(setFavorites(response.data))
        return response.data;
    }
}

export const setFavorite = (userId1, userId2, status) => async (dispatch) => {
    const response = await fetch(`/api/users/setFavorite/${userId1}/${userId2}/${status}`, {
        method: "POST"
    });
    dispatch(getAllFavorites(userId1));
    // if (response.ok){
    //     const res2 = await await fetch(`/api/users/getfavorites/${userId}/${ip}`);
    //     let data = res2.json();
    //     dispatch(setFavorites(data))
    //     return data;
    // }
    return;
}

const initialState = {favorites: []}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            }
        default:
            return state;
    }
}