import {BaseUrl, Unauthorized} from "@/component/Utility/Helper";
import toast from "react-hot-toast";
import axios from "axios";
import {SetCartList, SetTotalCart} from "@/redux/state-slice/Cart-Slice";
import store from "@/redux/store/store";
import {HideLoader, ShowLoader} from "@/redux/state-slice/Loading-Slice";


export const CreateCartRequest = async (selectedColor, selectedSize, quantity, productID) => {
    let reqBody = {color:selectedColor, size:selectedSize, qty:quantity}
    let URL = `${BaseUrl}/CreateCart/${productID}`
    try{
        store.dispatch(ShowLoader())
        let res = await axios.post(URL, reqBody,{withCredentials: true})
        if(res.status === 201){
            store.dispatch(HideLoader())
            toast.success("Cart Added Successfully");
            return true;
        }
        else{
            store.dispatch(HideLoader())
            toast.error("Something went wrong");
            return false;
        }
    }
    catch (error) {
        if(error.response.status === 401){
            store.dispatch(HideLoader())
            Unauthorized(401)
        }
        store.dispatch(HideLoader())
        toast.error(error.response.data.message)
        return false;
    }
}

export const ReadCartRequest = async () => {
    let URL = `${BaseUrl}/ReadCart`
    try{
        let res = await axios.get(URL,{withCredentials: true})
        if(res.status === 200){
            store.dispatch(SetCartList(res.data.data))
            store.dispatch(SetTotalCart(res?.data?.data?.length))
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
        toast.error(error.response.data.message)
    }
}

export const DeleteCartRequest = async (id) => {
    let URL = `${BaseUrl}/DeleteCart/${id}`
    try{
        let res = await axios.get(URL,{withCredentials: true})
        if(res.status === 200){
            toast.success("Cart Deleted Successfully");
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
        }
        toast.error(error.response.data.message)
        return false;
    }
}