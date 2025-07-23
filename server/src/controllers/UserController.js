import {
    LoginService, LogoutService,
    RecoverPasswordService,
    RegisterService,
    SendOTPService,
    UpdatePasswordService,
    UpdateProfileService,
    UserReadProfileService,
    VerifyOTPService,
} from "../services/UserService.js";


export const Register = async (req, res) => {
    await  RegisterService(req, res)
}

export const Login = async (req, res) => {
    await LoginService(req, res)
}

export const Logout = async (req, res) => {
    await LogoutService(req, res)
}

export const  SendOTP = async (req, res) => {
    await  SendOTPService(req, res)
}


export const  VerifyOTP = async (req, res) => {
    await  VerifyOTPService(req, res)
}


export const  RecoverPassword = async (req, res) => {
    await  RecoverPasswordService(req, res)
}


export const UserReadProfile = async (req, res) => {
    await UserReadProfileService(req, res)
}


export const UpdateProfile = async (req, res) => {
    await UpdateProfileService(req, res)
}

export const UpdatePassword = async (req, res) => {
    await UpdatePasswordService(req, res)
}
