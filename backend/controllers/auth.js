const User = require('../models/User');
const bcrypt = require('bcrypt');

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

module.exports = { handleSignup };
