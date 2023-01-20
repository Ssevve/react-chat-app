require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const verifyJWT = require('./middleware/verifyJWT');

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
app.use('/users', verifyJWT, require('./routes/users'));
app.use('/chats', verifyJWT, require('./routes/chats'));
app.use('/messages', verifyJWT, require('./routes/messages'));

// Socket events
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', async () => {
    console.log('user disconnected');
  });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  server.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`),
  );
});
