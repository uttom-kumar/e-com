import axios from "axios";
import {toast} from "react-hot-toast";

const BaseUrl = process.env.REACT_APP_BASE_URL;

export const RegisterRequest = async (reqBody) => {
    let URL = `${BaseUrl}/Register`
    return await axios.post(URL, reqBody).then((res) => {
        if(res.status === 200){
            if(res.data['status']=== "failed"){
                toast.error("Email Already Existed");
                return false;
            }
            else{
                toast.success("Registration Successful!");
                return true;
            }
        }
        else{
            toast.error("SomeThing Went Wrong")
            return false;
        }
    })
}


export const LoginRequest = async (reqBody) => {
    let URL = `${BaseUrl}/Login`

    return await axios.post(URL, reqBody).then((res) => {
        if(res.status === 200){
            if(res.data['status']=== "failed"){
                toast.error(res.data['message']);
                return false ;
            }
            else{
                toast.success("Login Successful!");
                return true;
            }
        }
    })
}