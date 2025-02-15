import React from 'react';
import { X, Clock, CheckCircle } from 'lucide-react';
import type { SketchType } from '../types';
import UploadForm from './UploadForm';

type Props = {
  sketchType: SketchType;
  onClose: () => void;
};

export default function SketchDetails({ sketchType, onClose }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
      {/* Left side - Details */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{sketchType.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <img 
          src={sketchType.imageUrl} 
          alt={sketchType.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{sketchType.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>Delivery in {sketchType.estimatedDays} days</span>
            </div>
            <span className="text-2xl font-bold text-indigo-600">₹{sketchType.price}</span>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">What's Included</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                High-quality handcrafted sketch
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Multiple size options available
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Free shipping worldwide
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                100% satisfaction guarantee
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side - Upload Form */}
      <div className="w-1/2 border-l">
        <UploadForm selectedType={sketchType} onClose={onClose} />
      </div>
    </div>
  );
}