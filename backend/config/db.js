const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
