import {createSlice} from "@reduxjs/toolkit";

export const LoadingSlice = createSlice({
    name: 'Loading',
    initialState: {
        isLoading : false,
    },
    reducers: {
        ShowLoader: (state) => {
            state.isLoading = true;
        },
        HideLoader: (state) => {
            state.isLoading = false;
        }
    }
})

export const {ShowLoader, HideLoader} = LoadingSlice.actions;
export default LoadingSlice.reducer;