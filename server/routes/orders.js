import express from 'express';
import Order from '../models/Order.js';
import { isAdmin } from '../middleware/auth.js';
import { uploadToS3 } from '../services/s3.js';
import { initializePayment } from '../services/payment.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    const payment = await initializePayment(order);
    res.status(201).json({ order, payment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user's orders
router.get('/my-orders', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.user.email })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get all orders (admin only)
router.get('/all', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

export default router;