import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export default function SocialMediaLinks() {
  return (
    <div className="flex items-center justify-center space-x-6 mt-6">
      <a
        href="https://instagram.com/your_instagram_handle"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
      >
        <Instagram className="h-6 w-6" />
        <span>Follow on Instagram</span>
      </a>
      <a
        href="https://wa.me/your_phone_number"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
        <span>Message on WhatsApp</span>
      </a>
    </div>
  );
}