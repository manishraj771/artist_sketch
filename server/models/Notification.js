import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  email: { type: String, default: "N/A" }, // ✅ Ensure email is saved
  phone: { type: String, default: "N/A" }, // ✅ Ensure phone is saved
  isRead: { type: Boolean, default: false }, // ✅ New Field
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', NotificationSchema);
