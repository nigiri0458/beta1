import { React, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);

    useEffect(() => {
        dispatch({type: cartItemsActionTypes.FETCHING});
        fetchCartItem()
        .then((data) => {
                dispatch({
                    type: cartItemsActionTypes.FETCH_SUCCESS,
                    payload: {
                        cart: data.cart
                    }
                });
                console.log(data);
            }
        )
        .catch((e) => {
            console.log(e);
        });
        console.log(state);
    }, [])

    return(
        <div className="cart-page-wrapper">
            {
                state.cartItems.map((event) =>
                    <div>
                        <Link key={event.index} to={`/events/${event.event_id}`}>
                            <div >
                                <img src={event.event_image}/>
                                <p>{event.event_name}</p>
                                <p>{event.quantity}</p>
                            </div>
                        </Link>
                    </div>
                    )
            }
        </div>
    )
}