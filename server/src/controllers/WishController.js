import {SaveWishService, ReadWishListService } from "../services/WishService.js";

export const CreateWish = async (req, res) => {
    await SaveWishService(req, res)
}

export const ReadWishList = async (req, res) => {
    await ReadWishListService(req, res)
}