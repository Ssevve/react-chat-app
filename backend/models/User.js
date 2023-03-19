const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
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
      url: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
    collation: { locale: 'en', strength: 2 }, // Makes the schema case insensitive (for username queries)
  }
);

module.exports = mongoose.model('User', userSchema);
