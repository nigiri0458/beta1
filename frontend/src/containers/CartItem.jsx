import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleted } from '../features/cartItemState/cartItemStateSlice';
import '../styles/CartItem.css';

import { changeCartItemQuantity, deleteCartItem } from '../apis/cart_items';

export const CartItem = (props) => {
    const item = props.item
    
    const dispatch = useDispatch();
    const [targetQuantity, setTargetQuantity] = useState()
    const [changed, setchanged] = useState(false);

    useEffect(() => {
        setTargetQuantity(item.quantity);
    }, [])

    const handlechangeQuantity = (cart_item_id, newQuantity) => {
        newQuantity = Number(newQuantity)
        changeCartItemQuantity(cart_item_id, newQuantity)
        .then()
        .catch((e) => {
            console.log(e)
        })
        setchanged(true)
        setTargetQuantity(newQuantity)
    }

    const handleSubmit = () => {
        setchanged(false)
    }

    const handleDelete = (cart_item_id) => {
        deleteCartItem(cart_item_id)
        .then(() => {
            dispatch(deleted());
        })
        .catch((e) => {
            console.log(e);
        })
    }

    
    
    return(
        <div>
            <div className="cart-item-container">
                <div className="cart-item-image-wrapper">
                    <img src={item.event_image} className="cart-item-image"/>
                </div>
                <div className="cart-item-text-part">
                    <div className="cart-item-link-wrapper">
                        <Link key={item.index} to={`/events/${item.event_id}`} className="cart-item-link">
                            <p className="cart-item-name">{item.event_name}</p>
                        </Link>
                    </div>
                    <div className="cart-item-add-to-cart">
                        <p className="cart-item-quantity">個数 Quantity</p>
                        <select className="cart-item-select" value={targetQuantity} onChange={(e) => handlechangeQuantity(item.cart_item_id, e.target.value)}>
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
                    </div>
                    {
                        changed ? 
                        <div className="cart-item-change-quantity-modal">
                            <p className="cart-item-change-quantity-modal-text">個数を{targetQuantity}に変更しました</p>
                            <div>
                                <button className="cart-item-submit-button" onClick={() => handleSubmit()}>OK</button>
                            </div>
                        </div> 
                        : 
                        <div></div>
                    }
                    <div className="cart-item-delete">
                        <button className="cart-item-delete-button" onClick={() => handleDelete(item.cart_item_id)}>削除<br/>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}