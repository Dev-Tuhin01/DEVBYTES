import { Router } from "express";
import { deleteBlog, getAllBlogs, getBlog, getGenreBlog, likeBlog, uploadBlog } from "../Controller/blog.controller.ts";
import AuthMiddleWare from "../Middleware/auth.middleware.ts";
import upload from "../Middleware/multer.middleware.ts";

const blogRouter = Router()

blogRouter.get("/",getAllBlogs);
blogRouter.post("/",AuthMiddleWare,upload.single("thumbnail"),uploadBlog);
blogRouter.get("/genre/:genre",getGenreBlog);
blogRouter.get("/:blogId",getBlog);
blogRouter.post("/:blogId/like",AuthMiddleWare,likeBlog);
blogRouter.patch("/:blogId",()=>{});
blogRouter.delete("/:blogId",AuthMiddleWare,deleteBlog);  

export default blogRouter;