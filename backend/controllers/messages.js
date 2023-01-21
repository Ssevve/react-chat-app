const Message = require('../models/Message');

const getMessageById = async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.messageId });
    if (!message) return res.status(400).json({ message: 'Message with provided ID not found' });
    res.status(200).json({
      _id: message._id,
      createdAt: message.createdAt,
      content: message.content,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessagesForChats = async (req, res) => {
  try {
    const messages = await Message.find({ members: { $in: req.user._id } })
      .populate('sender', '_id username avatar.url')
      .lean();

    const chatMessagesMap = {};

    for (const message of messages) {
      if (message.chatId in chatMessagesMap) {
        chatMessagesMap[message.chatId] = [...chatMessagesMap[message.chatId], message];
      } else {
        chatMessagesMap[message.chatId] = [message];
      }
    }
    res.status(200).json(chatMessagesMap);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createNewMessage = async (req, res) => {
  try {
    const { message } = req.body;
    message.senderId = req.user._id;
    const newMessage = await Message.create(message);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getMessageById, getMessagesForChats, createNewMessage };
