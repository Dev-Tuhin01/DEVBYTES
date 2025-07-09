import express, {type Request, type Response } from "express";
import dotenv from "dotenv";
import app from "./src/index.ts";
import connectDB from "./src/Config/db.ts";


dotenv.config()

const port = process.env.PORT || 5001;

app.get("/health",(req:Request, res:Response)=>{
  console.log("hit");
  res.status(200).json({
    data:"Working"
  });
});

app.listen(port,async ()=>{
  await connectDB();
  console.log(`App is running on port ${port}`);
})

