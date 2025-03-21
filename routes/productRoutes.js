import express from 'express';
import { isAdmin, reuireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteproductController, getproductController, getProductPhotoController, getsingleProductController, productCatController, productCountController, productFilterController, productListController, searchProductController, similarProductController, updateProductController } from '../controllers/productController.js';
import formidable  from 'express-formidable'


const router = express.Router()
//routes
//create
router.post('/create-product',reuireSignIn,isAdmin,formidable(),createProductController)
//getall
router.get('/get-product',getproductController)
//single
router.get('/getsingle-product/:slug',getsingleProductController)
//get photo
router.get ('/product-photo/:pid',getProductPhotoController)
//delete
router.delete('/delete-product/:pid',deleteproductController)
//update
router.put(
    "/update-product/:pid",
    reuireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
  //filter
  router.post('/product-filter',productFilterController)
  //product count
  router.get('/product-count',productCountController)
  //product per page
  router.get('/product-list/:page',productListController)
  //searchProduct
  router.get('/search/:keyword',searchProductController)
  //similar product
  router.get('/similar-product/:pid/:cid',similarProductController)
  //category wise prod
  router.get('/prod-category/:slug',productCatController)
  //payments route
  //token
  router.get('/braintree/token',braintreeTokenController)
  //payement
  router.post('/braintree/payment',reuireSignIn,braintreePaymentController)
  

export default router