import express from 'express'
const router = express.Router()

import * as UserController from "../controllers/UserController.js"





// user API
router.post('/Register',UserController.Register)









export default router;