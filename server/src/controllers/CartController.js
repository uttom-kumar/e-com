import {CreateCartService, DeleteCartService, ReadCartService, UpdateCartService} from "../services/CartService.js";


export const CreateCart = async (req, res) => {
    await CreateCartService(req, res)
}

export const DeleteCart = async (req, res) => {
    await DeleteCartService(req, res)
}

export const UpdateCart = async (req, res) => {
    await UpdateCartService(req, res)
}

export const ReadCart = async (req, res) => {
    await ReadCartService(req, res)
}