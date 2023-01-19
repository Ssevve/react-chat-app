const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
    lastMessageId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chat', chatSchema);
