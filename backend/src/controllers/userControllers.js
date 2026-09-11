import bcrypt from "bcrypt";

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
