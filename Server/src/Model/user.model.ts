import { Schema, type Document, model } from "mongoose";

export interface UserInterface extends Document {
  userName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserInterface>({
  userName: {
    type: String,
    required:true,
    unique: true,
    trim:true
  },
  email: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase: true
  },
  password: {
    type:String,
    required:true
  }
});

const User = model<UserInterface>("User",userSchema);

export default User;