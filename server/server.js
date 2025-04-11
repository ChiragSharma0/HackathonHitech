const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

connectDB();
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send message to all users except sender
  socket.on('send-message', (data) => {
    io.emit('receive-message', {
      username: data.username,
      message: data.message,
      senderId: data.senderId,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});





const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
app.use("/api/auth", authRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);