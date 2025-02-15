import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  },
  sketchType: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  notes: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);