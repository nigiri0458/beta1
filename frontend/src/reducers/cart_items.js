import { REQUEST_STATE } from '../constants';

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    cartItems: [],
};

export const cartItemsActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const cartItemsReducer = (state, action) => {
    switch (action.type) {
        case cartItemsActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case cartItemsActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                cartItems: action.payload.cart,
            };
    
        default:
            throw new Error();
    }
}