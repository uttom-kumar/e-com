import {createSlice} from "@reduxjs/toolkit";

export const wishSlice = createSlice({
    name : 'wish',
    initialState : {
        wishList : [],
        totalWish: 0,
    },
    reducers : {
        SetWishList : (state, action) => {
            state.wishList = Array.isArray(action.payload) ? action.payload : [];
        },
        SetTotalWish : (state, action) => {
            state.totalWish = action.payload;
        }
    }
})

export const {SetWishList,SetTotalWish } = wishSlice.actions;
export default wishSlice.reducer;