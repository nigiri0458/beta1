import { Fragment } from 'react';
import {React, useEffect, useReducer} from 'react';

import { fetchEventsIndex } from '../apis/events';

import { initialState, eventsActionTypes, eventsReducer } from '../reducers/events'

export const Events = () => {
    const [state, dispatch] = useReducer(eventsReducer, initialState)

    useEffect(() => {
        dispatch({ type: eventsActionTypes.FETCHING });
        fetchEventsIndex()
        .then((data) => 
            dispatch({ type: eventsActionTypes.FETCH_SUCCESS,
            payload: {
                events: data.events
            }
         })
        )
    }, [])
    return(
        <Fragment>
            {state.eventsList.map( event => 
            <div>
                { event.name }
            </div>
         )
            }
        </Fragment>
    )
}