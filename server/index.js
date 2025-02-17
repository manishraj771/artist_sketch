import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
//const { Server } = require('socket.io');

console.log("✅ Socket.IO module loaded successfully");


import { createServer } from 'http';
import authRoutes from './routes/auth.js';
import sketchRoutes from './routes/sketches.js';
import orderRoutes from './routes/orders.js';
import galleryRoutes from './routes/gallery.js';
import appointmentRoutes from './routes/appointments.js';
import { verifyToken } from './middleware/auth.js';
import notificationRoutes from './routes/notifications.js';


dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // ✅ Allow all origins (for development)

    // origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  }
});

export { io }; // ✅ Export socket instance for use in other files

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Database Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

// Handle MongoDB Connection Errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sketches', sketchRoutes);
app.use('/api/orders', verifyToken, orderRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/notifications', notificationRoutes);


// Start the server AFTER MongoDB is connected
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

// ✅ Handle real-time notifications
io.on('connection', (socket) => {
  console.log('⚡ Admin Connected:', socket.id);
});
