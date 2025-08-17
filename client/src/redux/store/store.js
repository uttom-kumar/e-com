import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/state-slice/ProfileSlice"
import LoadingReducer from "@/redux/state-slice/Loading-Slice";
import CategoryReducer from "@/redux/state-slice/Category-Slice";
import ProductReducer from "@/redux/state-slice/Product-Slice";
import CartReducer from "@/redux/state-slice/Cart-Slice";
import WishReducer from "@/redux/state-slice/Wish-Slice";

export default configureStore({
    reducer: {
        ProfileData: ProfileReducer,
        loading : LoadingReducer,
        category : CategoryReducer,
        productList : ProductReducer,
        cartList : CartReducer,
        wishList : WishReducer,

    },
});
