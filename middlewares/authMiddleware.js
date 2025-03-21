import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token based
export const reuireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_TOKEN);
    req.user = decode
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Token is required",
      error,
    });
  }
};
//admin Access
export const isAdmin = async(req,res,next)=>{
    try{
       const user = await userModel.findById(req.user._id)
       if(user.role !==1){
        res.status(404).send({
            success:false,
            message:'Unauthorized Acccess'
        })
       }else{
        next()
       }
    }catch(error){
       console.log(error);
       res.status(500).send({
        success:false,
        message:'Error in Admin Check',
        error
       })
       
    }

}