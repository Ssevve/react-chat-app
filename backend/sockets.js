const { Server } = require('socket.io');
const socketVerifyJWT = require('./middleware/socketVerifyJWT');

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
      origins: [
        'http://localhost:3000',
        'https://react-chat-app-clhf.vercel.app',
      ],
    },
  });

  app.set('socketio', io);
  app.set('connectedUsers', connectedUsers);

  io.use((socket, next) => socketVerifyJWT(socket, next));

  io.on('connection', (socket) => {
    if (socket.user) {
      addUser(socket.user._id, socket.id);
    }
    io.emit('receiveConnectedUsers', connectedUsers);

    socket.on('disconnect', () => {
      removeUser(socket.user._id);
      io.emit('receiveConnectedUsers', connectedUsers);
    });
  });
};

module.exports = initializeSocketEvents;
