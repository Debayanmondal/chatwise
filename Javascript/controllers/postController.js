import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ authorId: userId });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsForPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).populate("userId", "name");
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
