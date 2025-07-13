import {CreateCategoryService} from "../services/CategoryService.js";

export const CreateCategory = async(req, res) => {
    await CreateCategoryService(req, res)
}

export const CreateSubCategory = async(req, res) => {

}