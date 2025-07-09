import { type Request,type Response } from "express";
import User from "../Model/user.model.ts";
import bcrypt from "bcrypt";
import { generateJWToken } from "../Utils/generateJWT.ts";

export const register = async (req:Request, res:Response) => {
  try {
    const {userName,email,password} = req.body;

    if(!userName || !email || !password) {
      console.log("Didn't recieved all inputs",req.body);
      res.status(400).json({
        error:"All inputs are not recieved properly"
      })
    }

    const existingUser = await User.findOne({userName});
    
    if (existingUser) {
      res.status(409).json({
        error:"User already exists"
      });
    }
    
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = new User({
      userName,
      email,
      password:hashedPassword,
    });
    
    await user.save();
    
    const token = generateJWToken(user._id as string);

    res.status(201).json({
      user: {
        ...user.toObject(),
        password:undefined
      },
      token
    });
  
  } catch (error) {
      console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        error:"Something went wrong in the server"
      });
  }
  
}


export const login = async (req:Request,res:Response)=>{
  try {
    const {userName,password} = req.body;
  
    const user = await User.findOne({userName});
  
    if (!user) {
      res.status(400).json({
        error:"Invalid User Name"
      });
      return ;
    }

    const isPasswordMatch = await bcrypt.compare(password,user?.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        error:"Invalid Password"
      });
      return ;
    }

    const token = generateJWToken(user._id as string);

    res.status(200).json({
      user: {
        ...user.toObject(),
        password:undefined
      },
      token
    });
  
    
  } catch (error) {
      console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        error:"Something went wrong in the server"
      });
  }
}