const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10s',
    },
  );
  return accessToken;
};

module.exports = generateAccessToken;
