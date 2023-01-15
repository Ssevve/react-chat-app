const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateAccessToken = require('../helpers/generateAccessToken');
const generateRefreshToken = require('../helpers/generateRefreshToken');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(401);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.save();

    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const duplicate = await User.findOne({ username });
    if (duplicate) return res.status(409).json({ message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) return res.sendStatus(204);
  const refreshToken = cookies.refreshToken;

  // Check if the token is in the DB
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  // Delete refresh token from the db
  user.refreshToken = '';
  await user.save();

  res.clearCookie('refreshToken', { httpOnly: true, secure: true });
  res.sendStatus(204);
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { handleSignup, handleLogin, handleLogout };
