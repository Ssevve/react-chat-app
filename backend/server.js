require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API' });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
});
