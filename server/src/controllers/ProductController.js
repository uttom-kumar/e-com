import {CreateProductService} from "../services/ProductService.js";


export const CreateProduct = async (req, res) => {
    await CreateProductService(req, res)
}