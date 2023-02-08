const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const messageSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    sender: {
      type: String,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', messageSchema);
