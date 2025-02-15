import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import sketchRoutes from './routes/sketches.js';
import orderRoutes from './routes/orders.js';
import galleryRoutes from './routes/gallery.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      retryWrites: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Handle MongoDB connection errors
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});