import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileData: []
    },
    reducers: {
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        }
    }
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
