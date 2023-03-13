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
    next(err);
  }
};

const createNewFriendInvite = async (req, res) => {
  const io = req.app.get('socketio'); // use the exported socketio module
  const connectedUsers = req.app.get('connectedUsers');

  const invite = {
    sender: req.user._id,
    receiver: req.body.friendId,
  };

  try {
    const duplicate = await FriendInvite.findOne({
      $or: [
        { sender: invite.sender, receiver: invite.receiver },
        {
          sender: invite.receiver,
          receiver: invite.sender,
        },
      ],
    });

    if (duplicate) return res.status(409).json({ message: 'Duplicate friend invite' });

    const newInvite = await FriendInvite.create(invite);
    await newInvite.populate([
      { path: 'sender', select: 'username avatar.url' },
      { path: 'receiver', select: 'username avatar.url' },
    ]);
    io.to(connectedUsers[newInvite.receiver._id]).emit('receiveFriendInvite', newInvite);
    res.status(201).json(newInvite);
  } catch (err) {
    next(err);
  }
};

const deleteFriendInvite = async (req, res) => {
  const io = req.app.get('socketio');
  const connectedUsers = req.app.get('connectedUsers');
  const { id } = req.params;
  try {
    const deletedInvite = await FriendInvite.findOneAndDelete({ _id: id });
    const emitTo =
      deletedInvite.sender === req.user._id ? deletedInvite.receiver : deletedInvite.sender;
    io.to(connectedUsers[emitTo]).emit('cancelFriendInvite', id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { getFriendInvitesByUserId, createNewFriendInvite, deleteFriendInvite };
