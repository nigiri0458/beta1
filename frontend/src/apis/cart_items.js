import axios from 'axios';
import { cartItemsCreate, userCartItemShow, userCartItemCreate } from '../urls/index';

export const createCartItem = (event_id, quantity) => {
    return axios.post(cartItemsCreate(event_id),
        {
            event_id: event_id,
            quantity: quantity
        }, { withCredentials: true })
        .then(res => {
            return res.data;
        })
        .catch((e) => {throw e;})
}

export const createUserCartItem = (cart_item_id) => {
    return axios.post(userCartItemCreate(cart_item_id),
    {
        cart_item_id: cart_item_id
    }, { withCredentials: true })
    .then(res => {
        return res.data;
    })
    .catch((e) => {throw e;})
}

export const fetchCartItem = () => {
    return axios.get(userCartItemShow,{ withCredentials: true })
    .then(res => {
        return res.data
    })
    .catch((e) => console.log(e))
}