import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addedAt: { type: Date, default: Date.now },
});

const friendRequestSchema = new mongoose.Schema({
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  friends: [friendSchema],
  friendRequests: {
    sent: [friendRequestSchema],
    received: [friendRequestSchema],
  },
});

export default mongoose.model("User", userSchema);
