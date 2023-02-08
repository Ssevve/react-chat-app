const FriendInvite = require('../models/FriendInvite');

const getFriendInvitesByUserId = async (req, res) => {
  try {
    const friendInvites = await FriendInvite.find({
      $or: [{ sender: req.params.userId }, { receiver: req.params.userId }],
    }).populate([
      {
        path: 'sender',
        select: 'avatar.url username',
      },
      {
        path: 'receiver',
        select: 'avatar.url username',
      },
    ]);
    res.status(200).json(friendInvites);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewFriendInvite = async (req, res) => {
  const { friendInvite } = req.body;
  const io = req.app.get('socketio'); // use the exported socketio module
  const connectedUsers = req.app.get('connectedUsers');
  try {
    const duplicate = await FriendInvite.findOne({
      $or: [
        { sender: friendInvite.sender, receiver: friendInvite.receiver },
        {
          sender: friendInvite.receiver,
          receiver: friendInvite.sender,
        },
      ],
    });

    if (duplicate) return res.status(409).json({ message: 'Duplicate invite' });

    const newFriendInvite = await FriendInvite.create(friendInvite);
    await newFriendInvite.populate([
      { path: 'sender', select: 'username avatar.url' },
      { path: 'receiver', select: 'username avatar.url' },
    ]);
    io.to(connectedUsers[friendInvite.receiver]).emit('receiveFriendInvite', newFriendInvite);
    res.status(201).json(newFriendInvite);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFriendInvite = async (req, res) => {
  try {
    await FriendInvite.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getFriendInvitesByUserId, createNewFriendInvite, deleteFriendInvite };
