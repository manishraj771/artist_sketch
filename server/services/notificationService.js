import Notification from '../models/Notification.js';
import { io } from '../index.js';

export async function sendAdminNotification(appointment) {
  try {
    console.log('🔹 Appointment Data:', appointment); // ✅ Debugging ke liye

    const notificationData = {
      message: `📅 New appointment booked by ${appointment.name} on ${new Date(appointment.date).toDateString()} at ${appointment.time}`,
      appointmentId: appointment._id,
      email: appointment.email || "N/A", // ✅ Ensure email is not undefined
      phone: appointment.phone || "N/A"  // ✅ Ensure phone is not undefined
    };
    console.log("📩 Final Notification Data to Save:", notificationData); // ✅ Debugging ke liye


    // ✅ Save to database
    const notification = new Notification(notificationData);
    await notification.save();

    // ✅ Emit notification to all connected admins
    io.emit('adminNotification', notificationData);
    console.log('✅ Admin Notified:', notificationData);
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
  }
}
