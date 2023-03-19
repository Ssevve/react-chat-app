const User = require('../models/User');

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user)
      return res
        .status(400)
        .json({ message: 'There is no user with provided ID.' });
    return res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      username: user.username,
    });
  } catch (err) {
    return next(err);
  }
};

const getFriendsByUserId = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user)
      return res
        .status(400)
        .json({ message: 'There is no user with provided ID.' });

    const friendsData = await Promise.all(
      user.friends.map((friendId) =>
        User.findOne({ _id: friendId }, 'username avatar.url')
      )
    );
    return res.status(200).json(friendsData);
  } catch (err) {
    return next(err);
  }
};

const addFriend = async (req, res, next) => {
  const io = req.app.get('socketio');
  const connectedUsers = req.app.get('connectedUsers');
  const { senderId } = req.params;
  try {
    const acceptingUser = await User.findOne(
      { _id: req.user._id },
      'username avatar.url friends'
    );
    acceptingUser.friends.push(senderId);
    await acceptingUser.save();
    delete acceptingUser.friends; // Don't need friends in the response

    const newFriend = await User.findOne(
      { _id: senderId },
      'username avatar.url friends'
    );
    newFriend.friends.push(req.user._id);
    await newFriend.save();

    io.to(connectedUsers[senderId]).emit('addFriend', acceptingUser);
    return res.status(200).json(newFriend);
  } catch (err) {
    return next(err);
  }
};

const deleteFriend = async (req, res, next) => {
  const io = req.app.get('socketio');
  const connectedUsers = req.app.get('connectedUsers');
  const { friendId } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const newFriends = user.friends.filter((friend) => friend !== friendId);
      user.friends = newFriends;
      await user.save();
    }

    const removedFriend = await User.findById(friendId);
    if (removedFriend) {
      const filteredFriends = removedFriend.friends.filter(
        (friend) => friend !== req.user._id
      );
      removedFriend.friends = filteredFriends;
      await removedFriend.save();
    }

    io.to(connectedUsers[friendId]).emit('removeFriend', req.user._id);
    return res.status(200).json(friendId);
  } catch (err) {
    return next(err);
  }
};

const getUsersByQuery = async (req, res, next) => {
  const { query } = req.params;
  const reg = `^${query}`;
  const regex = new RegExp(reg, 'i');
  try {
    const users = await User.find({ username: regex }, 'username avatar.url');
    const filteredUsers = users.filter((user) => user._id !== req.user._id);
    return res.status(200).json(filteredUsers);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getFriendsByUserId,
  getUserById,
  getUsersByQuery,
  addFriend,
  deleteFriend,
};
