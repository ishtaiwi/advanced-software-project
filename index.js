const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const ChatModel = require('./models/chatModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orphans', require('./routes/orphanRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));
app.use('/api/revenue', require('./routes/revenueRoutes'));

io.on('connection', (socket) => {
  console.log(' New socket connection');

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on('chatMessage', ({ roomId, senderId, message }) => {
    if (!roomId || !senderId || !message) return;

    ChatModel.saveMessage(roomId, senderId, message, (err) => {
      if (err) {
        console.error('Failed to save message:', err.message);
        return;
      }

      ChatModel.getMessagesByRoom(roomId, (err, messages) => {
        if (err) {
          console.error(' Failed to fetch messages:', err.message);
          return;
        }

        io.to(roomId).emit('roomMessages', messages);
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
