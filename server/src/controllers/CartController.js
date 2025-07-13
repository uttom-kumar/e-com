import {CreateCartService} from "../services/CartService.js";


export const CreateCart = async (req, res) => {
    await CreateCartService(req, res)
}