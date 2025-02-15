import React, { useState } from 'react';
import { Palette, Image } from 'lucide-react';
import SketchStyleManager from './admin/SketchStyleManager';
import GalleryManager from './admin/GalleryManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'sketches' | 'gallery'>('sketches');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('sketches')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            activeTab === 'sketches'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Palette className="h-5 w-5" />
          <span>Sketch Styles</span>
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            activeTab === 'gallery'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Image className="h-5 w-5" />
          <span>Gallery</span>
        </button>
      </div>

      {activeTab === 'sketches' && <SketchStyleManager />}
      {activeTab === 'gallery' && <GalleryManager />}
    </div>
  );
}