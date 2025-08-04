class Helper {
    Unauthorized(code){
        if(code===401){
            sessionStorage.clear();
            localStorage.clear();
            Cookies.remove('student');
            window.location.href="/login"
        }
    }

    isUserLoggedIn(){
        return localStorage.getItem('token') !== null
    }
}

export const {
    Unauthorized,
    isUserLoggedIn

} = new Helper()