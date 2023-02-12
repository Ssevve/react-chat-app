const User = require('../models/User');
const FriendInvite = require('../models/FriendInvite');

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
        return User.findOne({ _id: friendId }, 'username statusText avatar.url');
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
  try {
    const acceptingUser = await User.findOne(
      { _id: req.user._id },
      'username statusText avatar.url friends',
    );
    acceptingUser.friends.push(senderId);
    await acceptingUser.save();
    delete acceptingUser.friends; // Don't need friends in the response

    const newFriend = await User.findOne(
      { _id: senderId },
      'username statusText avatar.url friends',
    );
    newFriend.friends.push(req.user._id);
    await newFriend.save();

    await FriendInvite.findOneAndDelete({ _id: req.body.inviteId });

    io.to(connectedUsers[senderId]).emit('addFriend', acceptingUser);
    res.status(200).json(newFriend);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUsersByQuery = async (req, res) => {
  const { query } = req.params;
  const reg = `^${query}`;
  const regex = new RegExp(reg, 'i');
  try {
    const users = await User.find({ username: regex }, 'username avatar.url');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getFriendsByUserId, getUserById, getUsersByQuery, addFriend };
