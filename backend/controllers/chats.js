const Chat = require('../models/Chat');

const getChatsForCurrentUser = async (req, res) => {
  try {
    const chats = await Chat.find({ members: { $in: req.user._id } })
      .sort({ createdAt: 1 })
      .populate([
        {
          path: 'lastMessage',
          select: 'content sender createdAt',
        },
        {
          path: 'members',
          select: 'username avatar.url',
        },
      ])
      .exec();
    res.status(200).json(chats);
  } catch (err) {
    next(err);
  }
};

const createNewChat = async (req, res) => {
  try {
    const duplicate = await Chat.findOne({ members: { $all: req.body.members } });
    if (duplicate) return res.status(409).json({ message: 'Chat already exists.' });

    const newChat = await Chat.create({
      _id: req.body._id,
      members: req.body.members,
    });

    res.status(201).json(newChat);
  } catch (err) {
    next(err);
  }
};

module.exports = { getChatsForCurrentUser, createNewChat };
