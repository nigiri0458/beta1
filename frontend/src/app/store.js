import { configureStore } from '@reduxjs/toolkit';
import loginStateReducer from '../features/loginState/loginStateSlice';

export default configureStore({
    reducer: {
        loginState: loginStateReducer,
    },
});