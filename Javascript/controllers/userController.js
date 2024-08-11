import Friendship from "../models/friendship.js";

export const getFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await Friendship.find({ userId }).populate(
      "friendId",
      "name"
    );
    res.json({ friends: friends.map((f) => f.friendId) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
