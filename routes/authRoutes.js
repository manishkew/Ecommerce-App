import express from 'express'
import {registerController,loginController, testController, forgotPasswordController, updatProfileController, getOrdersController, getAllordersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, reuireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routing

// Register || POST
router.post('/register',registerController)
//LOGIN || POST 
router.post('/login',loginController)
//Forget Pass
router.post('/forget-password',forgotPasswordController)
//test route
router.get('/test',reuireSignIn,isAdmin,testController)
//protected route auth user
router.get('/user-auth',reuireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    }) 
})
//protected admin
router.get('/admin-auth',reuireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    }) 
})

//update Profile
 router.put('/profile',reuireSignIn,updatProfileController)
 //orders
 router.get('/orders',reuireSignIn,getOrdersController)
 //all orders

 router.get('/Allorders',reuireSignIn,isAdmin,getAllordersController)
 // order update
 router.put('/order-status/:orderId',reuireSignIn,isAdmin,orderStatusController)
export default router

