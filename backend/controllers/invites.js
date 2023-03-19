const FriendInvite = require('../models/FriendInvite');

const getFriendInvitesByUserId = async (req, res, next) => {
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
    return res.status(200).json(friendInvites);
  } catch (err) {
    return next(err);
  }
};

const createNewFriendInvite = async (req, res, next) => {
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

    if (duplicate)
      return res.status(409).json({ message: 'Duplicate friend invite' });

    const newInvite = await FriendInvite.create(invite);
    await newInvite.populate([
      { path: 'sender', select: 'username avatar.url' },
      { path: 'receiver', select: 'username avatar.url' },
    ]);
    io.to(connectedUsers[newInvite.receiver._id]).emit(
      'receiveFriendInvite',
      newInvite
    );
    return res.status(201).json(newInvite);
  } catch (err) {
    return next(err);
  }
};

const deleteFriendInvite = async (req, res, next) => {
  const io = req.app.get('socketio');
  const connectedUsers = req.app.get('connectedUsers');
  const { id } = req.params;
  try {
    const invite = await FriendInvite.findOneAndDelete({ _id: id });
    const emitTo =
      invite.sender === req.user._id ? invite.receiver : invite.sender;
    io.to(connectedUsers[emitTo]).emit('cancelFriendInvite', id);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getFriendInvitesByUserId,
  createNewFriendInvite,
  deleteFriendInvite,
};
