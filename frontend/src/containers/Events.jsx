import { Fragment } from 'react';
import {React, useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Events.css';

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
        );
        console.log(state);
    }, [])
    return(
        <div className="events-page-wrapper">
            <p className="events-page-title">イベント一覧 EVENTS</p>
            <div className="events-page-container">
            {
                state.eventsList.map((event) =>
                    <Link key={event.id} to={`/events/${event.id}`} className="events-page-event-link">
                        <div className="events-page-event" >
                            <img src={event.image}  className="events-page-image" />
                            <p className="events-page-name">{event.name}</p>
                            <p className="events-page-date">{event.date}</p>
                        </div>
                    </Link>
                    )
            }
            </div>
        </div>
    )
}