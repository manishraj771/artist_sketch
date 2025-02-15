import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import GalleryImage from '../models/GalleryImage.js';

const router = express.Router();

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery images' });
  }
});

// Add new gallery image (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const image = new GalleryImage(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error adding gallery image' });
  }
});

// Delete gallery image (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery image' });
  }
});

export default router;