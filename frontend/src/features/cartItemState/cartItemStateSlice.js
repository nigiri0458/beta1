import { createSlice } from '@reduxjs/toolkit';

export const cartItemStateSlice = createSlice({
    name: 'cartItemState',
    initialState: {
        count: 0,
    },
    reducers: {
        deleted: (state) => {
            state.count++;
        }
    },
});

export const { deleted } = cartItemStateSlice.actions;

export default cartItemStateSlice.reducer;