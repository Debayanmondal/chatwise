import Friendship from "../models/friendship.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const getFeedForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await Friendship.find({ userId }).populate("friendId");
    const friendIds = friends.map((f) => f.friendId._id);

    // Get posts by friends
    let feed = await Post.find({ authorId: { $in: friendIds } });

    // Get posts commented on by friends
    const comments = await Comment.find({
      userId: { $in: friendIds },
    }).populate("postId");
    comments.forEach((comment) => {
      const post = comment.postId;
      if (
        !friendIds.includes(post.authorId) &&
        !feed.some((p) => p._id.equals(post._id))
      ) {
        feed.push(post);
      }
    });

    res.json({ feed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
