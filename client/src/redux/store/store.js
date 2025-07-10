import { configureStore } from "@reduxjs/toolkit";
import DataListReducer from "@/redux/state-slice/DataList-Slice";

export default configureStore({
    reducer: {
        DataList: DataListReducer,
    },
});
