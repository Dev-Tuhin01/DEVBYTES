import { Router } from "express";

const blogRouter = Router()

blogRouter.get("/",()=>{});
blogRouter.post("/",()=>{});
blogRouter.get("/:topic",()=>{});
blogRouter.get("/:blogId",()=>{});
blogRouter.patch("/:blogId",()=>{});
blogRouter.delete("/:blogId",()=>{});

export default blogRouter;