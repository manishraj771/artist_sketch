import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sketchTypes } from '../data/sketchTypes';
import SketchDetails from '../components/SketchDetails';

export default function SketchDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sketchType = sketchTypes.find(type => type.id === id);

  if (!sketchType) {
    return navigate('/');
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <SketchDetails
        sketchType={sketchType}
        onClose={() => navigate('/')}
      />
    </main>
  );
}