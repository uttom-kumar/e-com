import Cookies from "js-cookie";

class Helper {
    Unauthorized(code){
        if(code===401){
            sessionStorage.clear();
            localStorage.clear();
            Cookies.remove('token');
            window.location.href="/login"
        }
    }

    isUserLoggedIn(){
        return Cookies.get('token')
    }

    BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    axiosHeader = {headers: {"token": Cookies.get('token')}};
}

export const {
    Unauthorized,
    isUserLoggedIn,
    BaseUrl,
    axiosHeader

} = new Helper()