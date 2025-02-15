import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import SketchType from '../models/SketchType.js';

const router = express.Router();

// Get all sketch types
router.get('/', async (req, res) => {
  try {
    const sketchTypes = await SketchType.find().sort({ createdAt: -1 });
    res.json(sketchTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sketch types' });
  }
});

// Add new sketch type (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const sketchType = new SketchType(req.body);
    await sketchType.save();
    res.status(201).json(sketchType);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sketch type' });
  }
});

// Delete sketch type (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await SketchType.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sketch type deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sketch type' });
  }
});

export default router;