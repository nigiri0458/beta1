import { React, useEffect, useReducer, useState } from 'react';
import { fetchCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);

    useEffect(() => {
        dispatch({type: cartItemsActionTypes.FETCHING});
        fetchCartItem()
        .then((data) =>
                dispatch({
                    type: cartItemsActionTypes.FETCH_SUCCESS,
                    payload: {
                        cart: data.cart
                    }
                })
        )
        .catch((e) => {
            console.log(e);
        });
        console.log(state);
    }, [])

    return(
        <div className="cart-page-wrapper">
        </div>
    )
}