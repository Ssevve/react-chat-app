const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const friendInviteSchema = mongoose.Schema(
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
    receiver: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FriendInvite', friendInviteSchema);
