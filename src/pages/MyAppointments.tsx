import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

// ✅ Define the Appointment type
interface Appointment {
  _id: string;
  date: string;
  time: string;
  message?: string;
}

export default function MyAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]); // ✅ Typed State

  useEffect(() => {
    // ✅ Ensure token is always a string before making the request
    if (!token) {
      console.warn("⚠️ No token found, skipping appointment fetch.");
      return;
    }

    async function fetchAppointments() {
      try {
        console.log("🔹 Fetching Appointments with Token:", token); // Debugging Step

        const data: Appointment[] = await api.appointments.getUserAppointments(token);
        console.log("✅ Appointments Fetched:", data); // Debugging Step

        setAppointments(data);
      } catch (error) {
        console.error("❌ Error Fetching Appointments:", error);
        toast.error('Failed to fetch appointments');
      }
    }

    fetchAppointments();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📅 My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="p-4 bg-white shadow-md rounded-md">
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Message:</strong> {appt.message || "No message"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
