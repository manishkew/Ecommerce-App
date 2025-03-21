import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";


dotenv.config();
//payment getway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is required",
        });
      case !description:
        return res.status(500).send({
          error: "discreption is required",
        });
      case !price:
        return res.status(500).send({
          error: "price is required",
        });
      case !category:
        return res.status(500).send({
          error: "category is required",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is required",
        });
      case photo && photo.size > 100000:
        return res.status(500).send({
          error: "photo is required and Should be less than 1 mb",
        });
    }
    const prodcuts = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) prodcuts.photo.data = fs.readFileSync(photo.path);
    prodcuts.photo.contentType = photo.type;
    await prodcuts.save();
    res.status(201).send({
      success: true,
      message: "prodcuts created  successfully",
      prodcuts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Create Product",
    });
  }
};

// get all product

export const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products",
      CountTotal: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      messaage: "error in get Product",
      error,
    });
  }
};
//get Single Product

export const getsingleProductController = async (req, res) => {
  try {
    const singleProduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single product found Sucessfully",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messaage: "error in get single-poduct",
      error,
    });
  }
};
//get photos
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("contentType", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get product photo",
      error,
    });
  }
};
//delete product
export const deleteproductController = async (req, res) => {
  try {
    const deleteProduct = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      messaage: "product deleted successfully",
      deleteProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete product",
      error,
    });
  }
};
//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.lenth) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Product Filter Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error In filter Product",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Product list shown successfully",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error In Product Count",
      error,
    });
  }
};
//productlist
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({createdAt:- 1});
      res.status(200).send({
        success:true,
        message:"product list shown successfully",
        products
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error In perpage Product List",
      error,
    });
  }
};
//serach product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
export const similarProductController = async() =>{
  try{
    const {pid,cid} = req.params
    const products = await productModel.find({category:cid,
      _id:{$ne:pid}

    }).select('-photo').limit(3).populate("category")
    res.status(200).send({
      success:true,
      message:"Similar Product",
      products
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in Similar Product API",
      error,
    })
    
  }
}
export const productCatController =async(req,res) =>{
  try{
    const category = await  categoryModel.findOne({slug:req.params.slug})
    const products = await productModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      message:'Product Category',
      category,
      products
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        messaage:'Error while getting Prod Category',
        error
    })
  }
}
//payment getway
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const braintreePaymentController = async(req,res) =>{
 try{
   const {cart,nonce} = req.body
   let total = 0
   cart.map((i)=>{total += i.price});
   let newTrans =  gateway.transaction.sale({amount:total,paymentMethodNonce:nonce,options:{
    submitForSettlement:true
   },
  },
   function(error,result){
       if(result){
        const order = new orderModel({
          products:cart,
          payment:result,
          buyer: req.user._id
        }).save()
        res.json({ok:true})
       }else{
        res.status(500).send({error})
       }
   }
  )
 }catch(error){
   console.log(error);
 }
}
