import {createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'Category',
    initialState: {
        category : [],
    },
    reducers: {
        SetCategory: (state, action) => {
            state.category = action.payload
        },
        // RemoveCategory: (state, action) => {
        //     state.category = state.category.filter(category => category.id !== action.payload)
        // }
    }
})

export const {SetCategory} = categorySlice.actions;
export default categorySlice.reducer;