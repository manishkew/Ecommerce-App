import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'
export const categoryController =async(req,res)=>{
     try{
         const {name} = req.body
         if(!name){
            return res.status(401).send({
                 message:"Name is required",
            })
         }
         const existingCategory = await categoryModel.findOne({name})
         if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'categoery already exists'
            })
         }
         const category = await new categoryModel({name,slug:slugify(name)}).save()
         res.status(201).send({
            success:true,
            message:"Category created successfully",
            category

         })
     }catch(error){
         console.log(error);
         res.status(500).send({
             success:false,
             message:"Error in creating category",
             error
         })
     }
}

//Update category
export const updateCategoryController =async(req,res)=>{
    try{
        const {name} = req.body;
        const { id } = req.params;
       const updatecategory = await categoryModel.findByIdAndUpdate(id,{name,slug: slugify(name) },{new: true})
       res.status(200).send({
        success:true,
        message:"Category updated successfully",
        updatecategory,
       })
    }catch(error){
        console.log(error);
        res.status(500).send({
             success:false,
             message:"Error in updating category",
             error
         })
    }

}
//get all Category
export const getAllCategoryController = async(req,res) =>{
    try{
        const categories = await categoryModel.find()
        res.status(200).send({
          success:true,
          message:"All Categories list",
          categories,
         
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            meesage:'error in getting All-Categories',
            error
        })
        
    }
}
//single category
export const getSingleCategoryController = async(req,res) =>{
    try{
         const {id} = req.params;
         const singleCategory =await categoryModel.findById(id)
         res.status(200).send({
            success:true,
            message:"single category",
            singleCategory,
         })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in getiing the Category',
            error
        })
    }
}

//delete catgory

export const deleteCategoryController = async(req,res) =>{
    try{
       const {id} = req.params
       const deleteCategory = await categoryModel.findByIdAndDelete(id)
       res.status(200).send({
        success:true,
        message:"category deleted successfully",
        deleteCategory,
       })
    }catch(error){
       console.log(error);
       res.status(500).send({
        success:false,
        message:'error while deleting category',
        error
       })
       
    }

}