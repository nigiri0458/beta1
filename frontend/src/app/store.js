import { configureStore } from '@reduxjs/toolkit';
import loginStateReducer from '../features/loginState/loginStateSlice';
import cartItemStateReducer from '../features/cartItemState/cartItemStateSlice';

export default configureStore({
    reducer: {
        loginState: loginStateReducer,
        cartItemState: cartItemStateReducer,
    },
});