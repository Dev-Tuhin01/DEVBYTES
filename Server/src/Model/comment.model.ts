import mongoose, { Document, Mongoose, Schema } from "mongoose";

export interface CommentInterface extends Document {
  comment: string;
  commentedBy: mongoose.Types.ObjectId;
  commentedOn: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<CommentInterface>({
  comment:{
    type: String,
    required: true,
    trim: true
  },
  commentedBy: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  commentedOn: {
    type: Schema.Types.ObjectId,
    ref:"Blog"
  },
},{
  timestamps: true
}
);

const Comment = mongoose.model<CommentInterface>("Comment",commentSchema);

export default Comment;