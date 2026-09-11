import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModels.js";

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(409).json({
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
    res.status(500).json({
        message:"Internal Server Error"
    })
  }
};


export const userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message:"provide valid credentials"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                message:"provide valid credentials"
            })
        }
        const isPasswordMatach = await bcrypt.compare(password,user.password);
        if(!isPasswordMatach){
            res.status(403).json({
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
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}