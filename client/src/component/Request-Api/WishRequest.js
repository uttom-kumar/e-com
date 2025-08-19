import {BaseUrl, Unauthorized} from "@/component/Utility/Helper";
import toast from "react-hot-toast";
import axios from "axios";
import store from "@/redux/store/store";
import {SetTotalWish, SetWishList} from "@/redux/state-slice/Wish-Slice";
import {HideLoader, ShowLoader} from "@/redux/state-slice/Loading-Slice";

export const CreateWishRequest = async (productID) => {
    let URL = `${BaseUrl}/CreateWish/${productID}`
    try{
        store.dispatch(ShowLoader())
        let res = await axios.post(URL,null,{withCredentials: true})
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

export const ReadWishRequest = async () => {
    let reqBody = {}
    let URL = `${BaseUrl}/ReadWishList`
    try{
        let res = await axios.get(URL, {withCredentials: true});
        if(res.status === 200){
            store.dispatch(SetWishList(res.data.data));
            store.dispatch(SetTotalWish(res?.data?.data?.length))
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
        toast.error(error.response.data.message);
        return false;
    }
}

export const DeleteWishRequest = async (id) => {

    let URL = `${BaseUrl}/DeleteWishList/${id}`
    try{
        let res = await axios.get(URL, {withCredentials: true});
        if(res.status === 200){
            toast.success("Wish Deleted Successfully");
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
        toast.error(error.response.data.message);
        return false;
    }
}