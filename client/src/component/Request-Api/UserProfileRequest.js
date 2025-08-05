import {axiosHeader, BaseUrl, Unauthorized} from "@/component/Utility/Helper.js";
import axios from "axios";
import store from "@/redux/store/store.js";
import {setProfileData} from "@/redux/state-slice/ProfileSlice";
import toast from "react-hot-toast";


export const UserReadProfileRequest = async () => {
    let URL = `${BaseUrl}/UserReadProfile`
    try{
        let res = await axios.get(URL, {withCredentials: true})
        if(res.status === 200){
            store.dispatch(setProfileData(res.data.data))
        }
    }
    catch (error) {
        if (error.response?.status === 401) {
            Unauthorized(401)
        }
        else {
            toast.error("Something went wrong");
        }
    }
}
