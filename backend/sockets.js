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
    const { userId } = socket.handshake.query;
    console.log('user connected');
    addUser(userId, socket.id);

    socket.on('sendMessage', async ({ message, receiverId }) => {
      const newMessage = await Message.create(message);
      newMessage.populate('sender', '_id username avatar.url');
      await Chat.findOneAndUpdate(
        { _id: message.chatId },
        {
          lastMessage: message._id,
        },
        {
          upsert: true,
        },
      );

      console.log(userId);
      const newChats = await Chat.find({ members: { $in: receiverId } })
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

      io.to(connectedUsers.get(receiverId)).emit('receiveMessage', { newMessage, newChats });
    });

    socket.on('disconnect', () => {
      removeUser(socket.handshake.query.userId);
      console.log('user disconnected');
    });
  });
};

module.exports = initializeSocketEvents;
