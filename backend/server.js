require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API' });
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
});
