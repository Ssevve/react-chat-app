const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const chatSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    members: {
      type: [String],
      ref: 'User',
      required: true,
    },
    lastMessage: {
      type: String,
      ref: 'Message',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Chat', chatSchema);
