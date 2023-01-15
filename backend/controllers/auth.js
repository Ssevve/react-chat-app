const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(401);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

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

    user.refreshToken = refreshToken;
    user.save();

    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
      path: '/refresh',
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

module.exports = { handleSignup, handleLogin };
