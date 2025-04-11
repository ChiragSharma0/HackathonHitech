<<<<<<< HEAD
=======
const dotenv = require('dotenv');
dotenv.config();

>>>>>>> 18032e76acf6599d6261d9a67686a697659a4892
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
<<<<<<< HEAD
const app = express();
const Routes = require('./routes/routes');

connectDB();
=======
const chatRoutes = require('./routes/chatRoutes');

require("./config/passport"); // All strategies

const app = express(); // Yeh line important hai

connectDB();
const Routes = require('./routes/routes');

>>>>>>> 18032e76acf6599d6261d9a67686a697659a4892


app.use(cors());

<<<<<<< HEAD
=======
// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL,  // example: http://localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io Setup
>>>>>>> 18032e76acf6599d6261d9a67686a697659a4892
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

app.use("/api", Routes);





server.listen(process.env.PORT, () => {
<<<<<<< HEAD
  console.log(`Server running on port ${process.env.PORT}`)});
=======
  console.log(`Server running on port ${process.env.PORT}`)});
>>>>>>> 18032e76acf6599d6261d9a67686a697659a4892
