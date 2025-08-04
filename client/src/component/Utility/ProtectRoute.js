import {isUserLoggedIn} from "@/component/Utility/Helper";


const PrivateRoute = ({ children }) => {
    return isUserLoggedIn() ? children : window.location.href='/login'
};

export default PrivateRoute;