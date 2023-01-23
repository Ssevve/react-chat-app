const { Server } = require('socket.io');
const Message = require('./models/Message');
const Chat = require('./models/Chat');

const connectedUsers = new Map();

const addUser = (userId, socketId) => {
  connectedUsers.set(userId, socketId);
};

const removeUser = (userId) => {
  connectedUsers.delete(userId);
};

const initializeSocketEvents = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log('user connected');
    addUser(socket.handshake.query.userId, socket.id);

    socket.on('sendMessage', async ({ message, receiverId }) => {
      // console.log(receiverId);
      let newMessage = await Message.create(message);
      newMessage = await newMessage.populate('sender', '_id username avatar.url');
      const chat = await Chat.findOne({ _id: message.chatId });
      chat.lastMessage = message._id;
      chat.save();
      io.to(connectedUsers.get(receiverId)).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
      removeUser(socket.handshake.query.userId);
      console.log('user disconnected');
    });
  });
};

module.exports = initializeSocketEvents;
