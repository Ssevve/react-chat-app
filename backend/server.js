require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const verifyJWT = require('./middleware/verifyJWT');
const initializeSocketEvents = require('./sockets');

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://react-chat-app-khaki.vercel.app'],
    credentials: true,
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
app.use('/users', verifyJWT, require('./routes/users'));
app.use('/chats', verifyJWT, require('./routes/chats'));
app.use('/messages', verifyJWT, require('./routes/messages'));
app.use('/invites', verifyJWT, require('./routes/invites'));

// Socket events
initializeSocketEvents(server, app);

const port = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  server.listen(port, () => console.log(`Server listening on port ${port}`));
});
