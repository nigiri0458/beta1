import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { fetchEventsShow } from '../apis/events';
import { createCartItem } from '../apis/cart_items';

import '../styles/EventDetails.css';

export const EventDetails = ({match}) => {
    const history = useHistory();

    const loginState = useSelector((state) => state.loginState.boolean);

    const [event, setEvent] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [eventAdded, setEventAdded] = useState(false);

    const handleAddToCart = () => {
         createCartItem(event.id, quantity)
         .then(() => {
            setEventAdded(true);
         })
         .catch((e) => {
             console.log(e);
         });
    }

    useEffect(() => {
        fetchEventsShow(match.params.event_id)
        .then(data => {
            window.scrollTo(0, 0);
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
                loginState === 'true' ?
                <div className="event-details-page-add-to-cart">
                    <p className="event-details-page-quantity">個数 Quantity</p>
                    <select className="event-details-page-select" onChange={(e) => setQuantity(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    {
                        eventAdded === false ?
                        <div className="event-details-page-button" onClick={() => handleAddToCart()}>
                            Add to Cart
                        </div>
                        :
                        <div></div>
                    }
                    {
                        eventAdded === true ?
                        <p className="event-details-page-message">カートに追加されました<br />Added to cart</p>
                        :
                        <div></div>
                    }
                </div>
                :
                <div className="event-details-page-button" onClick={() => history.push('/login')}>
                    ログイン<br />Login
                </div>
            }
        </div>
    )
}