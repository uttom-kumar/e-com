import express from 'express'
const router = express.Router()

import * as UserController from "../controllers/UserController.js"
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import * as CartController from "../controllers/CartController.js";
import * as CategoryController from "../controllers/CategoryController.js";
import * as ProductController from "../controllers/ProductController.js";
import {RoleMiddleware} from "../middlewares/RoleMiddleware.js";





// user API
router.post('/Register',UserController.Register)
router.post('/Login',UserController.Login)


router.post('/SendOTP',UserController.SendOTP)
router.post('/VerifyOTP',UserController.VerifyOTP)
router.post('/RecoverPassword',UserController.RecoverPassword)

router.get('/UserReadProfile', AuthMiddleware,  UserController.UserReadProfile)
router.post('/UpdateProfile', AuthMiddleware, UserController.UpdateProfile)
router.post('/UpdatePassword', AuthMiddleware, UserController.UpdatePassword)


// categories
router.post('/CreateCategory', AuthMiddleware, RoleMiddleware(['admin']), CategoryController.CreateCategory)

// Products
router.post('/CreateProduct', AuthMiddleware, RoleMiddleware(['admin']), ProductController.CreateProduct)
router.post('/UpdateProduct', AuthMiddleware, RoleMiddleware(['admin']), ProductController.UpdateProduct)
router.post('/CreateProductDetail', AuthMiddleware, RoleMiddleware(['admin']), ProductController.CreateProductDetail)
router.post('/UpdateProductDetail', AuthMiddleware, RoleMiddleware(['admin']), ProductController.UpdateProductDetail)

router.get('/ReadProductDetail', ProductController.ReadProductDetail)



// add cart products
router.post('/CreateCart', AuthMiddleware, CartController.CreateCart)








export default router;