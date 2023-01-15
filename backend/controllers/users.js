const User = require('../models/User');

const getFriendsByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) return res.sendStatus(401);

    const friendsData = await Promise.all(
      user.friends.map((friendId) => {
        return User.findOne({ _id: friendId }, 'username avatar.url');
      }),
    );
    res.status(200).json(friendsData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getFriendsByUserId };
