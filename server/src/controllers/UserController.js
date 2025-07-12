import {
    RegisterService,
} from "../services/UserService.js";


export const Register = async (req, res) => {
    await  RegisterService(req, res)
}
