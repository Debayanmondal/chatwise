import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
