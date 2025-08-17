import axios from "axios";
import toast from "react-hot-toast";
import {Unauthorized} from "@/component/Utility/Helper";
import store from "@/redux/store/store";
import {SetCategory} from "@/redux/state-slice/Category-Slice";
import {SetProductList} from "@/redux/state-slice/Product-Slice";

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL;

// CategoryReadRequest
export const CategoryReadRequest = async () => {
    let URL = `${BaseURL}/ReadCategory`

    let res = await axios.get(URL)
    try{
        if(res.status === 200){
            store.dispatch(SetCategory(res.data.data))
            return true;
        }
        else{
            toast.error("Something went wrong");
            return false;
        }
    }
    catch (error) {
        if(error.response.status === 401){
            toast.error(res.data.message);
            Unauthorized(401)
        }
        toast.error(res.data.message);
        return false;
    }
}

// read a product list
export const ProductListRead = async () => {
    let URL = `${BaseURL}/ReadProduct`
    let res = await axios.get(URL)
    try{
        if(res.status === 200){
            return store.dispatch(SetProductList(res.data.data))
        }
        else{
            toast.error(res.data.message);
            return false;
        }
    }
    catch (error) {
        if(error.response.status === 401){
            Unauthorized(401)
        }
        toast.error(res.data.message);
        return false;
    }
}

// read a product details list
export const ProductDetailsRead = async (id) => {
    let URL = `${BaseURL}/ProductDetail/${id}`
    let res = await axios.get(URL)
    try{
        if(res.status === 200){
            store.dispatch(SetProductList(res.data.data))
            return true;
        }
        else{
            toast.error("Something went wrong");
            return false;
        }
    }
    catch (error) {
        if(error.response.status === 401){
            Unauthorized(401)
            return false;
        }
        toast.error(error.response.data.message);
        return false;
    }
}