import { type Request, type Response } from "express";
import { type AuthReq } from "../Middleware/auth.middleware.ts";
import Comment from "../Model/comment.model.ts";
import Blog from "../Model/blog.model.ts";
import { Types } from "mongoose";


export const postComment = async (req:AuthReq, res:Response) => {
  try {
    const { comment } = req.body;
    const { blogId } = req.params;
    const userId = req.user?._id;

    if (!comment) {
      res.status(400).json({
        success: false,
        message: "No comment found",
        error:"Empty Comment"
      });
      
      return ;
    }

    const commentdoc = new Comment({
      comment,
      commentedBy:userId,
      commentedOn: blogId
    });

    await commentdoc.save();

    res.status(201).json({
      success: true,
      message: "Comment posted",
      commentdoc
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

export const getComments = async (req:Request,res:Response) => {
  try {
    const {blogId} = req.params;
  
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Could not find the blog",
        error: `No Blog found with id: ${blogId}`
      });
      return;
    }

    const comments = await Comment.find({
      commentedOn: blog._id
    }).populate("commentedBy","userName");
  

    res.status(200).json({
      success:true,
      message: "Fetched All the comments on blog",
      comments
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

export const deleteComment = async (req:AuthReq,res:Response) => {
  try {
    const {commentId} = req.params;
    const userId = req.user?._id as Types.ObjectId;
  
    const comment = await Comment.findById(commentId);
  
    if (!comment) {
     res.status(400).json({
        success: false,
        message: "No comment found",
        error:"Empty Comment"
      });
      
      return ; 
    }

    if (comment.commentedBy.toString() !== userId.toString()) {
      res.status(403).json({
        success:false,
        message: "Only orignal creator can delete their comment",
        error:`comment is created by: ${comment.commentedBy} and can not be deleted by: ${userId}`
      });

      return ;
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment Deleted"
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