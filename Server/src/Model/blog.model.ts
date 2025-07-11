import mongoose, {Schema, type Document } from "mongoose";

export interface BlogInterface extends Document {
  title: string;
  content: string;
  genre: "Technology" | "Movies" | "Games" | "Book" | "Culture" | "Mythology" | "History";
  likes: number;
  likedBy?:mongoose.Types.ObjectId[];
  createdBy?:mongoose.Types.ObjectId;
  thumbnail?:string;
}

const blogSchema = new Schema<BlogInterface>({
  title:{
    type:String,
    required:true,
    trim:true,
  },
  content:{
    type:String,
    required:true,
  },
  genre:{
    type: String,
    enum: ["Technology" , "Movies" , "Games" , "Book" , "Culture" , "Mythology" , "History"],
  },
  likes:{
    type:Number,
    default:0,
  },
  likedBy:[{
    type:Schema.Types.ObjectId,
    ref:"User",
  }],
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  thumbnail:{
    type:String,
    default:null
  }
},{
  timestamps:true,
});

const Blog = mongoose.model<BlogInterface>("Blog",blogSchema);
export default Blog;

