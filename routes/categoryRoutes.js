import express from 'express'
import { isAdmin, reuireSignIn } from '../middlewares/authMiddleware.js'
import { categoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js'



const router = express.Router()
//create category
router.post('/create-category',reuireSignIn,isAdmin,categoryController)
//upadte category
router.put('/update-category/:id',reuireSignIn,isAdmin,updateCategoryController)
//getAll categories
router.get('/getAll-categories',getAllCategoryController)
//get category
router.get('/get-category/:id',getSingleCategoryController)
//delete category
router.delete('/delete-category/:id',deleteCategoryController,reuireSignIn,isAdmin)

export default router