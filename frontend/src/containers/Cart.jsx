import { React, useEffect, useReducer, useState} from 'react';
import { useSelector } from 'react-redux';
import { fetchCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';
import { CartItem } from './CartItem';
import '../styles/Cart.css';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);
    const itemStateCount = useSelector((state) => state.cartItemState.count);

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
            <h1 className="cart-page-title">カート Cart</h1>
                {
                    state.cartItems.map((item) =>
                        <div className="cart-page-cart-item-wrapper" key={item.cart_item_id}>
                            <CartItem
                                key={item.cart_item_id}
                                item={item}
                            />
                        </div>
                    )
                }
        </div>
    )
}