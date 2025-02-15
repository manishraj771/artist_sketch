import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type GalleryImage = {
  id: string;
  url: string;
  description: string;
};

export default function AdminGalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newImage, setNewImage] = useState({
    url: '',
    description: ''
  });

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch gallery images');
      return;
    }

    setImages(data as GalleryImage[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('gallery_images')
        .insert([newImage]);

      if (error) throw error;

      toast.success('Image added to gallery!');
      setNewImage({ url: '', description: '' });
      fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to add image');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Image removed from gallery');
      setImages(images.filter(img => img.id !== id));
    } catch (error) {
      toast.error('Failed to delete image');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            required
            value={newImage.url}
            onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            required
            value={newImage.description}
            onChange={(e) => setNewImage(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add to Gallery</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}