import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SketchDetailsPage from './pages/SketchDetailsPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/AdminRoute';
import MyAppointments from './pages/MyAppointments';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-appointments" element={<MyAppointments />} />

          <Route path="/sketch/:id" element={<SketchDetailsPage />} />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}