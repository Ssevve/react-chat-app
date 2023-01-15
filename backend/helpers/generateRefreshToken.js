const jwt = require('jsonwebtoken');

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return refreshToken;
};

module.exports = generateRefreshToken;
