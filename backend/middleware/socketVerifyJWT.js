const jwt = require('jsonwebtoken');

const socketVerifyJWT = (socket, next) => {
  const { accessToken } = socket.handshake.auth;
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    socket.user = decoded;
  } catch (err) {
    return next(new Error('Not authorized'));
  }
  return next();
};

module.exports = socketVerifyJWT;
