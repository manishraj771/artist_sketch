import React, { useEffect, useState } from 'react';
import { Palette, Image, Bell, LayoutDashboard, ChevronRight } from 'lucide-react';
import SketchStyleManager from './SketchStyleManager';
import GalleryManager from './GalleryManager';
import { io } from 'socket.io-client';
import { api } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 5000,
});

export default function AdminDashboard() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'sketches' | 'gallery' | 'notifications'>('sketches');
  const [notifications, setNotifications] = useState<{ 
    _id: string;
    message: string; 
    appointmentId: string;
    email: string;
    phone: string;
    isRead: boolean;
  }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  useEffect(() => {
    if (!token) {
      console.error("❌ Token is missing. Cannot fetch notifications.");
      return;
    }

    async function fetchNotifications() {
      if (!token) return;
      try {
        const data = await api.notifications.getAll(token);
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } catch (error) {
        toast.error('Failed to load notifications');
      }
    }

    fetchNotifications();

    socket.on('connect', () => {
      console.log('✅ Admin Connected to Socket.IO:', socket.id);
    });

    socket.on('adminNotification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      playNotificationSound();
      toast.success(`📢 ${notification.message}`);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO');
    });

    return () => {
      socket.off('adminNotification');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [token]);

  const markAsRead = async (id: string) => {
    if (!token) return;
    try {
      await api.notifications.markAsRead(id, token);
      setNotifications(notifications.map(notif => notif._id === id ? { ...notif, isRead: true } : notif));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const menuItems = [
    { id: 'sketches', icon: Palette, label: 'Sketch Styles' },
    { id: 'gallery', icon: Image, label: 'Gallery' },
    { id: 'notifications', icon: Bell, label: 'Notifications', count: unreadCount }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out z-50
        ${isSidebarOpen ? 'w-64' : 'w-20'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100/50 bg-gradient-to-r from-violet-500 to-purple-500">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'hidden'}`}>
            <LayoutDashboard className="w-8 h-8 text-white" />
            <span className="font-bold text-xl text-white">Admin</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronRight className={`w-5 h-5 text-white transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <nav className="p-4">
          {menuItems.map(({ id, icon: Icon, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`
                w-full mb-2 p-3 flex items-center rounded-xl transition-all duration-200
                ${activeTab === id 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-200' 
                  : 'hover:bg-purple-50 text-gray-700'}
                ${!isSidebarOpen && 'justify-center'}
              `}
            >
              <Icon className={`w-5 h-5 ${!isSidebarOpen && 'w-6 h-6'}`} />
              {isSidebarOpen && (
                <div className="flex items-center justify-between flex-1 ml-3">
                  <span>{label}</span>
                  {count !== undefined && count > 0 && (
                    <span className="px-2 py-1 text-xs font-medium bg-white text-purple-600 rounded-full">
                      {count}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="h-16 bg-white/80 backdrop-blur-xl shadow-sm px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-purple-50 relative">
              <Bell className="w-6 h-6 text-purple-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100">
            {activeTab === 'sketches' && <SketchStyleManager />}
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'notifications' && (
              <div className="p-6">
                {notifications.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                      <Bell className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Notifications</h3>
                    <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notif) => (
                      <div 
                        key={notif._id}
                        className={`
                          group relative overflow-hidden rounded-xl transition-all duration-200
                          ${notif.isRead 
                            ? 'bg-white/50 border border-purple-100' 
                            : 'bg-gradient-to-r from-violet-50/80 to-purple-50/80 border border-purple-200'}
                          hover:shadow-lg hover:shadow-purple-100/50
                        `}
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3">
                              <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                                {notif.message}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center text-gray-500">
                                  <span className="font-medium mr-2">Email:</span>
                                  {notif.email || "N/A"}
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <span className="font-medium mr-2">Phone:</span>
                                  {notif.phone || "N/A"}
                                </div>
                              </div>
                            </div>
                            {!notif.isRead && (
                              <button 
                                onClick={() => markAsRead(notif._id)}
                                className="
                                  px-4 py-2 bg-white text-purple-600 text-sm font-medium rounded-lg
                                  border border-purple-200 hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-500 
                                  hover:text-white transition-all duration-200 shadow-sm
                                "
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>
                        </div>
                        {!notif.isRead && (
                          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-violet-500 to-purple-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}