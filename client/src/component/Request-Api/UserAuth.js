import axios from "axios";
import {toast} from "react-hot-toast";
import Cookies from "js-cookie";
import {BaseUrl} from "@/component/Utility/Helper";
import {HideLoader, ShowLoader} from "@/redux/state-slice/Loading-Slice";
import store from "@/redux/store/store";



export const RegisterRequest = async (reqBody) => {
    let URL = `${BaseUrl}/Register`;
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(URL, reqBody);
        store.dispatch(HideLoader())
        if (res.status === 201) {
            toast.success("Registration Successful!");
            return true;
        } else {
            toast.error(res.data.message || "Something Went Wrong");
            return false;
        }
    } catch (error) {
        store.dispatch(HideLoader())
        if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something Went Wrong");
        }
        return false;
    }
};

export const LoginRequest = async (reqBody) => {
    let URL = `${BaseUrl}/Login`
    try{
        store.dispatch(ShowLoader())
        const res = await axios.post(URL, reqBody)
        if(res.status === 200){
            store.dispatch(HideLoader())
            if(res.data['status']=== "failed"){
                toast.error(res.data['message']);
                return false ;
            }
            else{
                Cookies.set('token', res.data['token'], {expires: 7})
                return true;
            }
        }
    }
    catch (error) {
        store.dispatch(HideLoader(  ))
        if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something Went Wrong");
        }
        return false;
    }
}

export const LogoutRequest = async () => {
    let URL = `${BaseUrl}/Logout`
    try{
        const res = await axios.get(URL,{withCredentials: true})
        if(res.status === 200){
            Cookies.remove('token')
            return true;
        }
    }
    catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
        }
        return false;
    }
}