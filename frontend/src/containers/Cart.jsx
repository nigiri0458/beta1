import { React, useEffect, useReducer, useState} from 'react';
import { fetchCartItem, purchaseCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';
import { CartItem } from './CartItem';
import '../styles/Cart.css';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);
    const [stateCount, setStateCount] = useState(0);

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
    }, [stateCount])

    const handleDelete = () => {
        const count = stateCount;
        setStateCount(count + 1);
    }

    const handlePurchase = () => {
        purchaseCartItem()
        .then(() => {
            const count = stateCount;
            setStateCount(count + 1);
            console.log('ok');
        })
        .catch((e) => {
            console.log(e);
        })
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
            <div className="cart-page-purchase-button" onClick={() => handlePurchase()}>
                抽選申し込み・購入<br/>Apply・Purchase
            </div>
        </div>
    )
}