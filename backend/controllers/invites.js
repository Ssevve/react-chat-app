const FriendInvite = require('../models/FriendInvite');

const getFriendInvitesForCurrentUser = (req, res) => {
  try {
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
    io.to(connectedUsers.get(friendInvite.receiver)).emit('receiveFriendInvite');
    res.status(201).json(newFriendInvite);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getFriendInvitesForCurrentUser, createNewFriendInvite };
