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
    console.log("Token being sent:", token); // 🔥 Debugging step

    if (!token) {
      toast.error('Please log in to book an appointment');
      return;
    }

    const appointmentData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      date: new Date(formData.date).toISOString(), // ✅ Ensure ISO format
      time: formData.time,
      message: formData.message.trim()
    };

    console.log("Final Appointment Data:", appointmentData); // 🔥 Debugging step

    try {
      const response = await api.appointments.create(appointmentData, token);
      console.log("API Response:", response); // 🔥 Debugging step

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
      console.error("Error Submitting Appointment:", error); // 🔥 Debugging step
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
            </div>
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg">
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
