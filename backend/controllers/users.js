const User = require('../models/User');

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) return res.status(400).json({ message: 'There is no user with provided ID.' });
    res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      statusText: user.statusText,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFriendsByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) return res.status(400).json({ message: 'There is no user with provided ID.' });

    const friendsData = await Promise.all(
      user.friends.map((friendId) => {
        return User.findOne({ _id: friendId }, 'username avatar.url statusText');
      }),
    );
    res.status(200).json(friendsData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFriend = async (req, res) => {
  const io = req.app.get('socketio');
  const connectedUsers = req.app.get('connectedUsers');
  const { senderId } = req.params;
  const { inviteId } = req.body;
  try {
    const acceptingUser = await User.findOne({ _id: req.user._id });
    acceptingUser.friends.push(senderId);
    await acceptingUser.save();

    const sender = await User.findOne({ _id: senderId });
    sender.friends.push(req.user._id);
    await sender.save();

    const newAcceptingUserFriends = await Promise.all(
      acceptingUser.friends.map((friendId) => {
        return User.findOne({ _id: friendId }, 'username avatar.url statusText');
      }),
    );

    const newSenderFriends = await Promise.all(
      sender.friends.map((friendId) => {
        return User.findOne({ _id: friendId }, 'username avatar.url statusText');
      }),
    );

    io.to(connectedUsers[senderId]).emit('friendInviteAccepted', {
      newFriends: newSenderFriends,
      friendInviteId: inviteId,
    });

    res.status(200).json(newAcceptingUserFriends);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsersByQuery = async (req, res) => {
  const { query } = req.params;
  const regex = new RegExp(query, 'i');
  console.log(query);
  try {
    const users = await User.find({ username: regex });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getFriendsByUserId, getUserById, getUsersByQuery, addFriend };
