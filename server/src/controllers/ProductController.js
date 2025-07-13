import {CreateProductService, UpdateProductService} from "../services/ProductService.js";


export const CreateProduct = async (req, res) => {
    await CreateProductService(req, res)
}


export const UpdateProduct = async (req, res) => {
    await UpdateProductService(req, res)
}