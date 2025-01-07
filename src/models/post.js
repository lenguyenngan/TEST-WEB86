import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
  userId: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Posts = mongoose.model("Posts", postSchema);
export default Posts;
