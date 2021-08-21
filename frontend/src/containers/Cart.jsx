import { React, useEffect, useReducer, useState} from 'react';
import { fetchCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';
import { CartItem } from './CartItem';
import '../styles/Cart.css';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);
    const [deletedCount, setDeletedCount] = useState(0);

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
            }
        )
        .catch((e) => {
            console.log(e);
        });
    }, [deletedCount])

    const handleDelete = () => {
        const count = deletedCount;
        setDeletedCount(count + 1);
    }

    return(
        <div className="cart-page-wrapper">
            <h1 className="cart-page-title">カート Cart</h1>
                {
                    state.cartItems.map((item) =>
                        <div className="cart-page-cart-item-wrapper" key={item.cart_item_id}>
                            <CartItem
                                key={item.cart_item_id}
                                item={item}
                                itemDelete={handleDelete}
                            />
                        </div>
                    )
                }
        </div>
    )
}