const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mkuarps.mongodb.net/chat-app?retryWrites=true&w=majority`,
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
