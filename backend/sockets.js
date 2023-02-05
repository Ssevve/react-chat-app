const { Server } = require('socket.io');
const Message = require('./models/Message');
const Chat = require('./models/Chat');

const connectedUsers = {};

const addUser = (userId, socketId) => {
  connectedUsers[userId] = socketId;
};

const removeUser = (userId) => {
  delete connectedUsers[userId];
};

const initializeSocketEvents = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  app.set('socketio', io);
  app.set('connectedUsers', connectedUsers);

  io.on('connection', (socket) => {
    const { userId } = socket.handshake.auth;
    addUser(userId, socket.id);
    io.emit('receiveConnectedUsers', { users: connectedUsers });

    socket.on('sendMessage', async ({ message, receiverId }) => {
      const newMessage = await Message.create(message);
      newMessage.populate('sender', 'username avatar.url');
      let chat = await Chat.findOne({ _id: message.chatId });
      if (!chat) {
        chat = new Chat({
          _id: message.chatId,
          members: [message.sender, receiverId],
        });
      }

      chat.lastMessage = newMessage._id;
      await chat.save();

      console.log(userId);
      const newChats = await Chat.find({ members: { $in: receiverId } })
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

      console.log(newChats);

      io.to(connectedUsers[receiverId]).emit('receiveMessage', { newMessage, newChats });
    });

    socket.on('disconnect', () => {
      removeUser(userId);
      io.emit('receiveConnectedUsers', { users: connectedUsers });
    });
  });
};

module.exports = initializeSocketEvents;
