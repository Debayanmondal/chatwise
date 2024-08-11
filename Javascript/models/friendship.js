import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Friendship", friendshipSchema);
