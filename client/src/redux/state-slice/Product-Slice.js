import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name : 'product',
    initialState : {
        productList : [],
    },
    reducers : {
        SetProductList : (state, action) => {
            state.productList = Array.isArray(action.payload) ? action.payload : [];
        }
    }
})

export const {SetProductList} = productSlice.actions;
export default productSlice.reducer;