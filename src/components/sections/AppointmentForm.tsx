import React, { useState } from 'react';
import { Calendar, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please log in to book an appointment');
      return;
    }

    try {
      await api.appointments.create(formData, token);
      toast.success('Appointment request submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to submit appointment request');
    }
  };

  return (
    <section id="appointment" className="mt-16 pt-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Book an Appointment</h3>
              <p className="mb-6 opacity-90">Schedule a consultation to discuss your custom sketch requirements.</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 transform transition-transform duration-300 hover:translate-x-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span>Available Monday - Saturday</span>
                </div>
                <div className="flex items-center space-x-3 transform transition-transform duration-300 hover:translate-x-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-indigo-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="md:w-1/2 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  placeholder="Your name"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  placeholder="your@email.com"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  placeholder="Your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  rows={3}
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Book Appointment</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}