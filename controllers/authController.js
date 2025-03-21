import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, Phone, address, answer } = req.body;
    if (!name) {
      return res.send({
        message: "name is requried",
      });
    }
    if (!email) {
      return res.send({
        message: "Email is requried",
      });
    }
    if (!password) {
      return res.send({
        message: "Password is requried",
      });
    }
    if (!Phone) {
      return res.send({
        message: "Phone no is requried",
      });
    }
    if (!address) {
      return res.send({
        message: "Adddress is requried",
      });
    }
    if (!answer) {
      return res.send({
        message: "Answer is requried",
      });
    }
    //check user
    const existinguser = await userModel.findOne({ email });
    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "already registerd please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      Phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Reagisterd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in registerd API",
      error,
    });
  }
};

//login || POST

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        success: "invalid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login sucessfully",
      user: {
        name: user.name,
        email: user.email,
        Phone: user.Phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
//Forget password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is Required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "Question is Required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "NewPassword is Required",
      });
    }
    //csheck
    const user = await userModel.findOne({ email, answer });
    //validate
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password has been updated or Chnaged",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};

// test Controller
export const testController = (req, res) => {
  try {
    res.send("protected Route");
  } catch (error) {
    console.log(error);
    res.send({
      error,
    });
  }
};
//update Profile

export const updatProfileController = async (req, res) => {
  try {
    const { name, email, password, address, Phone } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ error: "PassWord Is Requiried & 6 char long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        Phone: Phone || user.Phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile has been updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update Profile",
      error,
    });
  }
};
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting orders",
      error,
    });
  }
};
export const getAllordersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting All-Orders",
      error,
    });
  }
};
//order status

export const orderStatusController = async(req,res) => {
  try {
    const {orderId} = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(orderId,{status}, {new: true})
    res.json(orders)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error While Updating order status',
      error,
    })

  }
}
