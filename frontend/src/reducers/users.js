import { REQUEST_STATE } from '../constants';

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    userInfo: []
};

export const usersActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const usersReducer = (state, action) => {
    switch (action.type) {
        case usersActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case usersActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                userInfo: action.payload.user,
            };
    
        default:
            throw new Error();
    }
}