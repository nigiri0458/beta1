import { createSlice } from '@reduxjs/toolkit';

export const cartItemStateSlice = createSlice({
    name: 'cartItemState',
    initialState: {
        boolean: false,
    },
    reducers: {
        deleted: (state) => {
            state.boolean = true;
            state.boolean = false;
        }
    },
});

export const { deleted } = cartItemStateSlice.actions;

export default cartItemStateSlice.reducer;