import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        cartList : [],
        totalCart: 0,
        cartQuantity : 0,
        TotalPrice : 0,
    },
    reducers : {
        SetCartList : (state, action) => {
            const list = Array.isArray(action.payload) ? action.payload : [];
            state.cartList = list;
            state.cartQuantity = list.reduce((sum, item) => sum + (item.qty || 0), 0);

            state.TotalPrice = list.reduce((sum, item) => {
                const price = item.product?.discount ? item.product?.discountPrice ?? item.product?.price : item.product?.price;
                const qty = item.qty || 0;
                return sum + price * qty ;
            }, 0);
        },
        SetTotalCart : (state, action) => {
            state.totalCart = action.payload;
        },
        SetCartQuantity : (state, action) => {
            state.cartQuantity = action.payload;
        }
    }
})

export const {SetCartList, SetTotalCart, SetCartQuantity} = cartSlice.actions;
export default cartSlice.reducer;