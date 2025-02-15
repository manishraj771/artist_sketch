import React from 'react';
import SketchTypeCard from '../components/SketchTypeCard';
import HowItWorks from '../components/sections/HowItWorks';
import Gallery from '../components/sections/Gallery';
import AppointmentForm from '../components/sections/AppointmentForm';
import Contact from '../components/sections/Contact';
import { sketchTypes } from '../data/sketchTypes';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Transform Your Photos into Art</h2>
        <p className="mt-4 text-xl text-gray-600">
          Choose from our selection of handcrafted sketch styles
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sketchTypes.map((type) => (
          <SketchTypeCard
            key={type.id}
            sketchType={type}
          />
        ))}
      </section>

      <HowItWorks />
      <Gallery />
      <AppointmentForm />
      <Contact />
    </main>
  );
}