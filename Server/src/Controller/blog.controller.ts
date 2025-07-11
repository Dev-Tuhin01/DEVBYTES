import {type Request, type Response } from "express";
import Blog from "../Model/blog.model.ts";
import {type AuthReq } from "../Middleware/auth.middleware.ts";
import saveImage from "../Utils/imageKitUtils.ts";
import { Types } from "mongoose";

export const getAllBlogs = async (req:Request,res:Response) => {
  try {
    const blogs = await Blog.find().populate("createdBy","userName").sort({createdAt:-1});
  
    res.status(200).json({
      success:true,
      blogs
    });
  } catch (error) {
      console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        success:false,
        message:"Something went wrong in the server",
        error:(error as Error).message
      });
  }
}

export const uploadBlog = async (req:AuthReq,res:Response) =>{
  try {
    const {title,content,genre} = req.body;
    const createdBy = req.user?._id;
    const thumbnail = req.file;
  
    if (!title || !content || !genre) {
      console.log("Didn't recieved all inputs",req.body);
        res.status(400).json({
          success:false,
          message: "Missing Inputs",
          error:"All inputs are not recieved properly" 
        })
  
    }
  
      var imgUrl:string | null = null;
  
      if (thumbnail) {
        imgUrl = await saveImage(thumbnail);
      }
  

      const blog = new Blog({
        title,
        content,
        genre,
        createdBy,
        thumbnail:imgUrl
      })

      await blog.save();

      res.status(201).json({
        success:true,
        message:"Blog is created",
        id:blog._id
      })
  
  } catch (error) {
     console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        success:false,
        message:"Something went wrong in the server",
        error:(error as Error).message
      });
  }    
}

export const getGenreBlog = async(req:Request,res:Response) =>{
  try {
    const {genre} = req.params;
    const blogs = await Blog.find({genre}).sort({createdAt:-1});

    res.status(200).json({
      succeess:true,
      message:`Found blogs in genre: ${genre}`,
      blogs
    })
  } catch (error) {
     console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        success:false,
        message:"Something went wrong in the server",
        error:(error as Error).message
      });
  }
}

export const getBlog = async (req:Request,res:Response) =>{
  try {
    const{blogId} = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404).json({
        success: false,
        message:"No blog found",
        error:`No blog found with id: ${blogId}`,
      });
    }

    res.status(200).json({
      error:true,
      message: "Blog found",
      blog
    })

  } catch (error) {
     console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        success:false,
        message:"Something went wrong in the server",
        error:(error as Error).message
      });
  }
}

export const likeBlog = async (req:AuthReq,res:Response) => {
 try {
   const {blogId} = req.params;
   const userId = req.user?._id as Types.ObjectId;
 
   const blog = await Blog.findById(blogId);

   if (!blog) {
    res.status(404).json({
      success:false,
      message:"No blog found",
      error:`No blog found with id: ${blogId}`
    })
    return ;
   }

  const alreadyLiked = blog.likedBy!.includes(userId);

  if (alreadyLiked) {
    blog.likedBy = blog.likedBy!.filter(id => id.toString() !== userId.toString());
    blog.likes = Math.max(0,blog.likes - 1);
  } else {
    blog.likedBy!.push(userId);
    blog.likes += 1;
  }

  await blog.save();

  res.status(200).json({
    success: true,
    message: alreadyLiked ? "Blog Disliked" : "Blog Liked",
    isLiked: !alreadyLiked,
    likes: blog.likes,
    likedBy: blog.likedBy
  });

   
 } catch (error) {
    console.error("Internal Server Error: ",(error as Error).message);
    res.status(500).json({
      success:false,
      message:"Something went wrong in the server",
      error:(error as Error).message
    });
 }
}

export const updateBlog = async (req:AuthReq, res:Response) => {
  try {
    const {blogId} = req.params
    const {title, content,genre} = req.body;
    const img = req.file;
    const userId = req.user?._id as Types.ObjectId;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "No Blog found",
        error: `No blog found with id: ${blogId}`
      });
  
      return ;
    }
  
    if (blog.createdBy?.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message:"Don't have permission to delete this blog",
        error: `Blog is created by user ${blog.createdBy} and can't be deleted by ${userId}`
      });

      return;
    }

    if (title){
      blog.title = title;
    }

    if (genre) {
      blog.genre = genre;
    }

    if (content) {
      blog.content = content
    }

    if (img) {
      const thumbnail = await saveImage(img);
      blog.thumbnail = thumbnail;
    }

    await blog.save();

    res.status(200).json({
      success:true,
      message: "Blog updated",
      blog
    })
    
  } catch (error) {
    console.error("Internal Server Error: ",(error as Error).message);
    res.status(500).json({
      success:false,
      message:"Something went wrong in the server",
      error:(error as Error).message
    });
  }
}


export const deleteBlog = async (req:AuthReq,res:Response) => {
  try {
    const {blogId} = req.params;
    const userId = req.user?._id as Types.ObjectId;
  
    const blog = await Blog.findById(blogId);
  
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "No Blog found",
        error: `No blog found with id: ${blogId}`
      });
  
      return ;
    }
  
    if (blog.createdBy?.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message:"Don't have permission to delete this blog",
        error: `Blog is created by user ${blog.createdBy} and can't be deleted by ${userId}`
      });

      return;
    }
  
    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      success: true,
      message: "Blog Deleted"
    });

  } catch (error) {
     console.error("Internal Server Error: ",(error as Error).message);
      res.status(500).json({
        success:false,
        message:"Something went wrong in the server",
        error:(error as Error).message
      });
  }
}