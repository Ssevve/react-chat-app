const { Server } = require('socket.io');

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
      origins: ['http://localhost:3000', 'https://react-chat-app-khaki.vercel.app'],
    },
  });

  app.set('socketio', io);
  app.set('connectedUsers', connectedUsers);

  io.on('connection', (socket) => {
    const { userId } = socket.handshake.auth;
    addUser(userId, socket.id);
    io.emit('receiveConnectedUsers', { users: connectedUsers });

    socket.on('disconnect', () => {
      removeUser(userId);
      io.emit('receiveConnectedUsers', { users: connectedUsers });
    });
  });
};

module.exports = initializeSocketEvents;
