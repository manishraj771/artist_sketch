import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mt-16 pt-16 bg-white rounded-lg shadow-sm p-8">
      <h3 className="text-2xl font-bold text-gray-900 text-center">How It Works</h3>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Step 
          number={1} 
          title="Choose Your Style" 
          description="Select from our various sketch styles" 
        />
        <Step 
          number={2} 
          title="Upload Your Photo" 
          description="Provide a high-quality photo" 
        />
        <Step 
          number={3} 
          title="Receive Your Sketch" 
          description="Get your handmade sketch delivered" 
        />
      </div>
    </section>
  );
}

type StepProps = {
  number: number;
  title: string;
  description: string;
};

function Step({ number, title, description }: StepProps) {
  return (
    <div className="group text-center p-6 rounded-xl hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
      <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto transform transition-transform duration-300 group-hover:rotate-12 group-hover:bg-indigo-200">
        <span className="text-2xl font-bold text-indigo-600 group-hover:text-indigo-700">{number}</span>
      </div>
      <h4 className="mt-4 text-lg font-semibold group-hover:text-indigo-600 transition-colors">{title}</h4>
      <p className="mt-2 text-gray-600 group-hover:text-gray-700">{description}</p>
    </div>
  );
}