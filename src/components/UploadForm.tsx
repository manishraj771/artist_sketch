import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import type { SketchType } from '../types';
import toast from 'react-hot-toast';

type Props = {
  selectedType: SketchType;
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  size: string;
  notes: string;
};

export default function UploadForm({ selectedType, onClose }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    size: 'A4',
    notes: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !token) {
      toast.error('Please select a file and ensure you are logged in');
      return;
    }

    try {
      setUploading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('photo', file);
      formDataToSend.append('sketchType', selectedType.name);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const { order, payment } = await api.orders.create(formDataToSend, token);

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: payment.amount,
        currency: payment.currency,
        name: "ArtisticSketches",
        description: `Payment for ${selectedType.name}`,
        order_id: payment.id,
        handler: async (response: any) => {
          try {
            await api.orders.updatePayment(order.id, {
              paymentId: response.razorpay_payment_id,
              status: 'completed'
            }, token);
            toast.success('Payment successful! Order confirmed.');
            onClose();
          } catch (error) {
            toast.error('Failed to confirm payment');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#4F46E5"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Failed to process order');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h3 className="text-xl font-semibold mb-6">Order Details</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="A4">A4 (210 × 297 mm)</option>
            <option value="A3">A3 (297 × 420 mm)</option>
            <option value="A2">A2 (420 × 594 mm)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    required
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {uploading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
}