import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { getFriends } from "./controllers/userController.js";
import {
  getPostsByUser,
  getCommentsForPost,
} from "./controllers/postController.js";
import { getFeedForUser } from "./controllers/feedController.js";

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/social_feed", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

// Routes
app.get("/friends/:userId", getFriends);
app.get("/posts/:userId", getPostsByUser);
app.get("/comments/:postId", getCommentsForPost);
app.get("/feed/:userId", getFeedForUser);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
