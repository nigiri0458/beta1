import { React, useEffect, useReducer, useState} from 'react';
import { fetchCartItem, purchaseCartItem } from '../apis/cart_items';
import { initialState, cartItemsActionTypes, cartItemsReducer } from '../reducers/cart_items';
import { CartItem } from './CartItem';
import '../styles/Cart.css';

export const Cart = () => {
    const [state, dispatch] = useReducer(cartItemsReducer, initialState);
    const [stateCount, setStateCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const addPrice = (price) => {
        const currentPrice = totalPrice;
        setTotalPrice(currentPrice + price);
    }

    const handlePurchase = () => {
        purchaseCartItem()
        .then(() => {
            const count = stateCount;
            setStateCount(count + 1);
            setModalOpen(true);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const closeModal = () => {
        setModalOpen(false);
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
                                addPrice={addPrice}
                            />
                        </div>
                    )
                }
            <p className="cart-page-total-price">合計：{totalPrice} 円</p>
            {
                !(modalOpen) ?
                <div className="cart-page-purchase-button" onClick={() => handlePurchase()}>
                抽選申し込み・購入<br/>Apply・Purchase
                </div>
                :
                <div className="cart-page-purchase-message">
                    <p className="cart-page-purchase-message-text">抽選申し込み・購入を受け付けました。<br/>抽選があるイベントを申し込みの場合は<br/>抽選結果をメールでお知らせいたします。</p>
                    <button onClick={() => closeModal()}>OK</button>
                </div>
            }
        </div>
    )
}