const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateAccessToken = require('../helpers/generateAccessToken');

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err || user.username !== data.username) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken });
  });
};

module.exports = { handleRefresh };
