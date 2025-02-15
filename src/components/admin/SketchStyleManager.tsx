import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import type { SketchType } from '../../types';

export default function SketchStyleManager() {
  const [sketchTypes, setSketchTypes] = useState<SketchType[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    estimatedDays: 1
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchSketchTypes();
  }, []);

  const fetchSketchTypes = async () => {
    try {
      const data = await api.sketches.getAll();
      setSketchTypes(data);
    } catch (error) {
      toast.error('Failed to fetch sketch types');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !token) return;

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('image', file);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      await api.sketches.create(formDataToSend, token);
      toast.success('Sketch style added successfully');
      setFormData({ name: '', description: '', price: 0, estimatedDays: 1 });
      setFile(null);
      fetchSketchTypes();
    } catch (error) {
      toast.error('Failed to add sketch style');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this sketch style?')) return;

    try {
      await api.sketches.delete(id, token);
      toast.success('Sketch style deleted');
      fetchSketchTypes();
    } catch (error) {
      toast.error('Failed to delete sketch style');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Sketch Styles</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Days</label>
            <input
              type="number"
              required
              min="1"
              value={formData.estimatedDays}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedDays: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Plus className="h-5 w-5" />
          <span>Add Sketch Style</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sketchTypes.map((type) => (
          <div key={type.id} className="relative group">
            <img
              src={type.imageUrl}
              alt={type.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button
                onClick={() => handleDelete(type.id)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <h3 className="mt-2 font-semibold">{type.name}</h3>
            <p className="text-gray-600">₹{type.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}