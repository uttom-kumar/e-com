import { configureStore } from "@reduxjs/toolkit";
import DataListReducer from "@/redux/state-slice/DataList-Slice";
import ProfileReducer from "@/redux/state-slice/ProfileSlice"

export default configureStore({
    reducer: {
        DataList: DataListReducer,
        ProfileData: ProfileReducer,
    },
});
