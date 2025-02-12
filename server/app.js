
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose')
const { Server } = require('socket.io');
const { createServer } = require('http');
const userrouter = require('./routes/users.js')

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",  // Allow all origins
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/user', userrouter);

// In-memory storage for messages in rooms
const rooms = { default: [] }; // Default chat room

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Automatically join the default room
  socket.join("default");
  socket.emit('joined-room', { roomId: "default", messages: rooms["default"] });

  // Create Room
  socket.on('create-room', () => {
    const roomId = Math.random().toString(36).substring(2, 9);
    // No longer creating room here.
    console.log(`Room creation requested: ${roomId}`);
    socket.emit('room-created', { roomId }); // Send back to the client
});

// Join Room (Modified)
socket.on('join-room', (roomId) => {
    if (!rooms[roomId]) {
        rooms[roomId] = []; // Create room if it doesn't exist
        console.log(`Room created: ${roomId}`);
    }
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // Send previous messages to user
    socket.emit('joined-room', { roomId, messages: rooms[roomId] });
});

  // Send Message
  socket.on('send', (data) => {
    const { msg, user, roomId = "default" } = data;
    if (rooms[roomId]) {
      const messageData = { msg, user };
      rooms[roomId].push(messageData); // Store message
      io.to(roomId).emit('recieve', messageData); // Broadcast message
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
