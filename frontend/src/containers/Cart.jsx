import { React, useEffect, useReducer } from 'react';
import { fetchCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);
    
    useEffect(() => {
        dispatch({type: cartItemsActionTypes.FETCHING});
        fetchCartItem()
        .then((data)=> {
            console.log(data);
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
    }, {})

    return(
        <div className="cart-page-wrapper">
            {state.cart}
        </div>
    )
}