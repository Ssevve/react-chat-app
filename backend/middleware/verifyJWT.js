const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = {
      _id: data._id,
      username: data.username,
      role: data.role,
    };
    return next();
  });
};

module.exports = verifyJWT;
