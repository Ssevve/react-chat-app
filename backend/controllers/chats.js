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
          select: 'username avatar.url statusText',
        },
      ])
      .exec();
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
};

// const updateLastMessage = async (req, res) => {
//   try {
//     const chat = await Chat.findOne({ _id: req.params.chatId });
//     if (!chat) res.status(404).json({ message: 'Chat with provided ID not found' });
//     chat.lastMessage = req.body.lastMessageId;
//     chat.save();
//     res.status(200).json(chat);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

module.exports = { getChatsForCurrentUser, createNewChat };
