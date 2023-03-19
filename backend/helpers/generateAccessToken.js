const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  return accessToken;
};

module.exports = generateAccessToken;
