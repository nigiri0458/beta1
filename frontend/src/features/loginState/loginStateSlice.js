import { createSlice } from '@reduxjs/toolkit';

export const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: {
        boolean: localStorage.getItem("loginState"),
    },
    reducers: {
        login: (state) => {
            state.boolean = 'true'
        },
        logout: (state) => {
            state.boolean = 'false'
        },
    },
});

export const { login, logout } = loginStateSlice.actions;

export default loginStateSlice.reducer;