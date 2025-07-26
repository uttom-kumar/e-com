import {CreateWishService} from "../services/WishService.js";

export const CreateWish = async (req, res) => {
    await CreateWishService(req, res)
}