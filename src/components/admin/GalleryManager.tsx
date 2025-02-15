import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import type { GalleryImage } from '../../types';

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const data = await api.gallery.getAll();
      setImages(data);
    } catch (error) {
      toast.error('Failed to fetch gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !token) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('description', description);

      await api.gallery.create(formData, token);
      toast.success('Image added to gallery');
      setDescription('');
      setFile(null);
      fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to add image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this image?')) return;

    try {
      await api.gallery.delete(id, token);
      toast.success('Image deleted');
      fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Plus className="h-5 w-5" />
          <span>Add to Gallery</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button
                onClick={() => handleDelete(image.id)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-gray-600">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}