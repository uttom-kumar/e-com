import express from 'express'
const router = express.Router()

import * as UserController from "../controllers/UserController.js"
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {RoleMiddleware} from "../middlewares/RoleMiddleware.js";
import * as CartController from "../controllers/CartController.js";
import * as CategoryController from "../controllers/CategoryController.js";
import * as ProductController from "../controllers/ProductController.js";
import * as WishController from "../controllers/WishController.js";

// user API
router.post('/Register',UserController.Register)
router.post('/Login',UserController.Login)
router.get('/Logout',UserController.Logout)


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

router.get('/ReadProduct', ProductController.ReadProduct)
router.get('/ProductDetail/:id', ProductController.ProductDetail)



// add cart products
router.post('/CreateCart/:id', AuthMiddleware, RoleMiddleware(['user']), CartController.CreateCart)
router.post('/DeleteCart/:id', AuthMiddleware, RoleMiddleware(['user']), CartController.DeleteCart)
router.post('/UpdateCart/:id', AuthMiddleware, RoleMiddleware(['user']), CartController.UpdateCart)
router.get('/ReadCart', AuthMiddleware, RoleMiddleware(['user']), CartController.ReadCart)

// add Wishes products
router.post('/CreateWish/:id',AuthMiddleware, RoleMiddleware(['user']), WishController.CreateWish)
router.get('/ReadWishList',AuthMiddleware, RoleMiddleware(['user']), WishController.ReadWishList)
router.get('/DeleteWishList/:id',AuthMiddleware, RoleMiddleware(['user']), WishController.DeleteWishList)






export default router;