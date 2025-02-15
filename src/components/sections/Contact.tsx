import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="mt-16 pt-16 pb-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Email</p>
                  <a href="mailto:contact@artisticsketches.com" className="hover:underline">
                    contact@artisticsketches.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Phone</p>
                  <a href="tel:+1234567890" className="hover:underline">
                    (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Address</p>
                  <p>123 Art Street, Creative City</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="font-medium mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h4 className="text-xl font-semibold mb-6">Send us a Message</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}