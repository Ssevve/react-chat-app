const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
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
  },
);

module.exports = mongoose.model('Chat', chatSchema);
