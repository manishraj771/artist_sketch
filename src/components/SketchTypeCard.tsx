import React from 'react';
import { Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SketchType } from '../types';

type Props = {
  sketchType: SketchType;
};

export default function SketchTypeCard({ sketchType }: Props) {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img 
          src={sketchType.imageUrl} 
          alt={sketchType.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{sketchType.name}</h3>
        <p className="mt-1 text-gray-600">{sketchType.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{sketchType.estimatedDays} days</span>
          </div>
          <span className="text-lg font-bold text-indigo-600">₹{sketchType.price}</span>
        </div>
        <button
          onClick={() => navigate(`/sketch/${sketchType.id}`)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-300 transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Details
        </button>
      </div>
    </div>
  );
}