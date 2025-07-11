import {type NextFunction,type Response, type Request } from "express";
import User, {type UserInterface } from "../Model/user.model.ts";
import { verifyJWToken } from "../Utils/generateJWT.ts";

export interface AuthReq extends Request {
  user?: UserInterface;
}

const AuthMiddleWare = async (req:AuthReq, res: Response, next: NextFunction) =>{
  try {
    
    const token = req.header("Authorization")?.replace("Bearer ","");

    if (!token) {
      throw new Error("No Token Found");
      return ;
    }

    const decoded = verifyJWToken(token) as {userId: string};

    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      throw new Error("No User found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log((error as Error).message);

    res.status(401).json({
      success:false,
      message: "Authentication error",
      error:(error as Error).message
    });
  }
}

export default AuthMiddleWare;