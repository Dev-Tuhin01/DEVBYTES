import jwt from "jsonwebtoken";


export const generateJWToken = (userId:string) => {
  
  return jwt.sign({ userId}, process.env.JWT_SECRET as string , {
  expiresIn: "15d"
});}

export const verifyJWToken = (token:string) => {
  try {
    return jwt.verify(token,process.env.JWT_SECRET as string);
  } catch (error) {
    throw new Error("invalid token");
  }
}