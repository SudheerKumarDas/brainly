import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModels.js";

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            message:"User with this email already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        username:username,
        email:email,
        password:hashedPassword
    })
    res.status(200).json({
        message:"User created successfully"
    })
  } catch (error) {
    console.error(`Error in Registering user ${error}`);
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
};


export const userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"provide valid credentials"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"provide valid credentials"
            })
        }
        const isPasswordMatach = await bcrypt.compare(password,user.password);
        if(!isPasswordMatach){
            return res.status(403).json({
                message:"provide valid credentials"
            })
        }
        const token = jwt.sign(
            {
                userId:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge:7*24*60*60*1000
        })
        res.status(201).json({
            message:"User logged in successfullly"
        })
    } catch (error) {
        console.error(`Error user logging in ${error}`);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const userDetails = async (req,res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(201).json({
            message:"Getting user info successfully",
            data:user
        })
    } catch (error) {
        console.error(`Error in getting user ${error}`);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const userLogout = async (req,res) => {
    try {
        const token = req.userId;
        res.clearCookie("token");
        return res.status(201).json({
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error(`Error in user logging out ${error}`);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}