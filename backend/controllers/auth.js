const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateAccessToken = require('../helpers/generateAccessToken');

function login401Error(res) {
  return res.status(401).json('Invalid username or password');
}

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return login401Error(res);
  try {
    const user = await User.findOne({ username });
    if (!user) return login401Error(res);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return login401Error(res);

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
    });
  } catch (err) {
    return next(err);
  }
};

const handleSignup = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json('Username and password are required');
  try {
    const duplicate = await User.findOne({ username });
    if (duplicate)
      return res.status(409).json({ message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = { handleSignup, handleLogin };
