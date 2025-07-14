import {
    CreateProductDetailService,
    CreateProductService,
    UpdateProductDetailsService,
    UpdateProductService
} from "../services/ProductService.js";


export const CreateProduct = async (req, res) => {
    await CreateProductService(req, res)
}


export const UpdateProduct = async (req, res) => {
    await UpdateProductService(req, res)
}

export const CreateProductDetail = async (req, res) => {
    await CreateProductDetailService(req, res)
}


export const UpdateProductDetail = async (req, res) => {
    await UpdateProductDetailsService(req, res)
}
