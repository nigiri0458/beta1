import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { fetchEventsShow } from '../apis/events';

import '../styles/EventDetails.css';

export const EventDetails = ({match}) => {
    const history = useHistory();

    const loginState = useSelector((state) => state.loginState.boolean);

    const [event, setEvent] = useState({});

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
            <h1 className="event-details-page-title">{event.name}</h1>
            <h1 className="event-details-page-artist">Artist: {event.group}</h1>
            <h1 className="event-details-page-date">Date: {event.date}</h1>
            <h2 className="event-details-page-ticket">Ticket: {event.price} yen</h2>
            <img src={event.image} className="event-details-page-img"/>
            <p className="event-details-page-des">{event.description}</p>
            <h3 className="event-details-page-buy">Add to Cart</h3>
            {
                loginState === 'true'  ?
                <div className="event-details-page-button">
                    Add to Cart
                </div>
                :
                <div className="event-details-page-button" onClick={() => history.push('/login')}>
                    ログイン<br />Login
                </div>
            }
        </div>
    )
}