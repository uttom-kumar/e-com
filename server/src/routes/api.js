import express from 'express'
const router = express.Router()

import * as UserController from "../controllers/UserController.js"





// user API
router.post('/Register',UserController.Register)
router.post('/Login',UserController.Login)


router.post('/SendOTP',UserController.SendOTP)
router.post('/VerifyOTP',UserController.VerifyOTP)
router.post('/RecoverPassword',UserController.RecoverPassword)









export default router;