const { Server } = require('socket.io');
const Message = require('./models/Message');

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
    console.log(connectedUsers);

    socket.on('sendMessage', async ({ message, receiverId }) => {
      // console.log(receiverId);
      await Message.create(message);
      // console.log(connectedUsers.get(receiverId));
      io.to(connectedUsers.get(receiverId)).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      removeUser(socket.handshake.query.userId);
      console.log(connectedUsers);
    });
  });
};

module.exports = initializeSocketEvents;
