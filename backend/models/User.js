const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 15,
    },
    password: {
      type: String,
      required: true,
    },
    friends: {
      type: [String],
      default: [],
    },
    avatar: {
      type: {
        url: String,
        cloudinaryId: String,
      },
    },
    statusText: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collation: { locale: 'en', strength: 2 }, // Makes the schema case insensitive (for username queries)
  },
);

module.exports = mongoose.model('User', userSchema);
