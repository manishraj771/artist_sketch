import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { GalleryImage } from '../../types';
import toast from 'react-hot-toast';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const data = await api.gallery.getAll();
      setImages(data);
    } catch (error) {
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="gallery" className="mt-16 pt-16 bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="mt-16 pt-16 bg-white rounded-lg shadow-sm p-8">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <GalleryImageCard 
            key={image.id}
            image={image}
            onClick={() => setSelectedImage(image.url)}
          />
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Full size view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}

type GalleryImageCardProps = {
  image: GalleryImage;
  onClick: () => void;
};

function GalleryImageCard({ image, onClick }: GalleryImageCardProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={image.url} 
        alt={image.description} 
        className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm opacity-90">{image.description}</p>
          <p className="text-xs mt-1">Click to view full size</p>
        </div>
      </div>
    </div>
  );
}