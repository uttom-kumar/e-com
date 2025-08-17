import {CreateCategoryService, ReadCategoryService} from "../services/CategoryService.js";

export const CreateCategory = async(req, res) => {
    await CreateCategoryService(req, res)
}

export const ReadCategory = async(req, res) => {
    await ReadCategoryService(req, res)
}