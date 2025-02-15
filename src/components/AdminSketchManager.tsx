import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { SketchType } from '../types';

export default function AdminSketchManager() {
  const [newSketch, setNewSketch] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    estimatedDays: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('sketch_types')
        .insert([newSketch]);

      if (error) throw error;

      toast.success('Sketch style added successfully!');
      setNewSketch({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        estimatedDays: 1
      });
    } catch (error) {
      toast.error('Failed to add sketch style');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Sketch Styles</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={newSketch.name}
            onChange={(e) => setNewSketch(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={newSketch.description}
            onChange={(e) => setNewSketch(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              value={newSketch.price}
              onChange={(e) => setNewSketch(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Days</label>
            <input
              type="number"
              required
              min="1"
              value={newSketch.estimatedDays}
              onChange={(e) => setNewSketch(prev => ({ ...prev, estimatedDays: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            required
            value={newSketch.imageUrl}
            onChange={(e) => setNewSketch(prev => ({ ...prev, imageUrl: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Sketch Style</span>
        </button>
      </form>
    </div>
  );
}