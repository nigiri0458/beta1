import {React, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import { fetchEventsShow } from '../apis/events';

import '../styles/EventDetails.css';

export const EventDetails = ({match}) => {
    const history = useHistory();
    const [event, setEvent] = useState({});
    const [loginState, setLoginState] = useState(localStorage.getItem("loginState"));

    useEffect(() => {
        fetchEventsShow(match.params.event_id)
        .then(data => {
            setEvent(Object.assign({},data.event));
            console.log(data);
            console.log(event);
            }
        )
    }, [])

    return(
        <div className="event-details-page-wrapper">
            <h1>{event.name}</h1>
            <h1>Artist: {event.group}</h1>
            <h1>Date: {event.date}</h1>
            <h2>Ticket: {event.price} yen</h2>
            <img src={event.image} />
            <p>{event.description}</p>
            <h3>Add to Cart</h3>
            {
                loginState === 'true'  ?
                <div className="event-details-button">
                    Add to Cart
                </div>
                :
                <div className="event-details-button" onClick={() => history.push('/login')}>
                    Login
                </div>
            }
        </div>
    )
}