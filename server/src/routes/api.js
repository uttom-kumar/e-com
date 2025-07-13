import express from 'express'
const router = express.Router()

import * as UserController from "../controllers/UserController.js"
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import * as CartController from "../controllers/CartController.js";





// user API
router.post('/Register',UserController.Register)
router.post('/Login',UserController.Login)


router.post('/SendOTP',UserController.SendOTP)
router.post('/VerifyOTP',UserController.VerifyOTP)
router.post('/RecoverPassword',UserController.RecoverPassword)

router.get('/UserReadProfile', AuthMiddleware, UserController.UserReadProfile)
router.post('/UpdateProfile', AuthMiddleware, UserController.UpdateProfile)
router.post('/UpdatePassword', AuthMiddleware, UserController.UpdatePassword)
router.post('/UpdateProfileImage', AuthMiddleware, UserController.UpdateProfileImage)


// add cart products
router.post('/CreateCart', AuthMiddleware, CartController.CreateCart)








export default router;