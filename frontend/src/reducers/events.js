import { REQUEST_STATE } from '../constants'

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    eventsList: []
};

export const eventsActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
}

export const eventsReducer = (state,action) => {
    switch (action.type) {
        case eventsActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case eventsActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                eventsList: action.payload.events,
            }
    
        default:
            throw new Error();
    }
}