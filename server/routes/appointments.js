import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';
import { sendAdminNotification } from '../services/notificationService.js';

const router = express.Router();

// ✅ Create appointment and notify admin
router.post('/', verifyToken, async (req, res) => {
    console.log("🔹 Request Body:", req.body); 
    console.log("🔹 Authenticated User:", req.user); 

    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: "Invalid token or user ID missing" });
    }

    try {
        // ✅ Ensure req.body ke andar email aur phone aa raha hai
        console.log("📩 Email Received:", req.body.email); 
        console.log("📞 Phone Received:", req.body.phone); 
        const appointment = new Appointment({
            userId: req.user.id,
            name: req.body.name,
            email: req.body.email || "N/A", // ✅ Default value
            phone: req.body.phone || "N/A", // ✅ Default value
            date: req.body.date,
            time: req.body.time,
            message: req.body.message || ""
          });

        await appointment.save();
        console.log("✅ Appointment Saved:", appointment); 

        // ✅ Notify admin
        await sendAdminNotification(appointment); // 🔥 FIX: Call function correctly

        res.status(201).json(appointment);
    } catch (error) {
        console.error("❌ Error Creating Appointment:", error);
        res.status(500).json({ message: 'Error creating appointment' });
    }
});

// ✅ Get user's appointments
router.get('/my', verifyToken, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id }).sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});

// ✅ Update appointment notification
router.patch('/:id/notification', verifyToken, async (req, res) => {
    try {
        const appointment = await Appointment.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { 
                notificationScheduledFor: req.body.notificationScheduledFor,
                notificationSent: false
            },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment notification' });
    }
});

export default router;
