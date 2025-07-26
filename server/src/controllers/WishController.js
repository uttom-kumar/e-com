import {SaveWishService, ReadWishListService, DeleteWishListService} from "../services/WishService.js";

export const CreateWish = async (req, res) => {
    await SaveWishService(req, res)
}

export const ReadWishList = async (req, res) => {
    await ReadWishListService(req, res)
}

export const DeleteWishList = async (req, res) => {
    await DeleteWishListService(req, res)
}
