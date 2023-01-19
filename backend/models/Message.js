const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  },
);

module.exports = mongoose.model('Message', messageSchema);
