import { supabase } from '../lib/supabase';

export async function scheduleNotification(appointmentId: string, appointmentDate: Date) {
  // Schedule notification 24 hours before appointment
  const notificationTime = new Date(appointmentDate);
  notificationTime.setHours(notificationTime.getHours() - 24);

  try {
    await supabase
      .from('appointments')
      .update({ 
        notification_scheduled_for: notificationTime.toISOString() 
      })
      .eq('id', appointmentId);

    // Request notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Schedule notification
        const timeUntilNotification = notificationTime.getTime() - Date.now();
        if (timeUntilNotification > 0) {
          setTimeout(() => {
            new Notification('Appointment Reminder', {
              body: 'Your appointment is tomorrow!',
              icon: '/vite.svg'
            });
          }, timeUntilNotification);
        }
      }
    }
  } catch (error) {
    console.error('Failed to schedule notification:', error);
  }
}