import React from 'react';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <AdminDashboard />
    </div>
  );
}