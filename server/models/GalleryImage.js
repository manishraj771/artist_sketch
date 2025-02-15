import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GalleryImage', galleryImageSchema);