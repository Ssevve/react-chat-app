const Message = require('../models/Message');
const Chat = require('../models/Chat');

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

const getMessagesByUserId = async (req, res) => {
  try {
    const messages = await Message.find({ members: { $in: req.params.userId } }).populate(
      'sender',
      '_id username avatar.url',
    );

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewMessage = async (req, res) => {
  const io = req.app.get('socketio');
  const connectedUsers = req.app.get('connectedUsers');
  try {
    const { chatId, content, receiverId } = req.body;

    const newMessage = await Message.create({
      content,
      chatId,
      sender: req.user._id,
    });
    await newMessage.populate('sender', '_id username avatar.url');

    // update chat
    const updatedChat = await Chat.findOneAndUpdate(
      { members: { $all: [req.user._id, receiverId] } },
      {
        lastMessage: newMessage._id,
      },
      {
        upsert: true,
        new: true,
      },
    );
    await updatedChat.populate('lastMessage', 'content sender createdAt');
    await updatedChat.populate('members', 'username avatar.url statusText');

    if (!newMessage.chatId) {
      newMessage.chatId = updatedChat._id;
      await newMessage.save();
    }

    const responseData = {
      newMessage,
      updatedChat,
    };

    io.to(connectedUsers[receiverId]).emit('receiveMessage', responseData);
    res.status(201).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getMessageById, getMessagesByUserId, createNewMessage };
