'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Bell, Calendar, CheckCircle2, XCircle, AlertCircle, Info, Search, Filter } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'reminder' | 'general';
  date: string;
  read: boolean;
}

// Mock data generator
const generateMockNotifications = (): Notification[] => {
  const notifications: Notification[] = [];
  const today = new Date();
  
  const notificationTemplates = [
    {
      type: 'appointment' as const,
      title: 'Appointment Reminder',
      messages: [
        'Your appointment with Dr. Ahmed Nabel is scheduled for tomorrow at 10:30 AM.',
        'Reminder: You have an appointment with Dr. Sarah Williams on Friday at 2:00 PM.',
        'Your upcoming appointment with Dr. Michael Brown is in 3 days.',
      ],
    },
    {
      type: 'prescription' as const,
      title: 'Prescription Ready',
      messages: [
        'Your prescription has been updated. Please review the new medications.',
        'New prescription available from Dr. Emily Chen. Check your medical records.',
        'Prescription refill approved. You can pick it up at the pharmacy.',
      ],
    },
    {
      type: 'reminder' as const,
      title: 'Medication Reminder',
      messages: [
        'Don\'t forget to take your medication as prescribed.',
        'Time for your daily medication. Please take it as scheduled.',
        'Reminder: Follow-up appointment needed in 2 weeks.',
      ],
    },
    {
      type: 'general' as const,
      title: 'General Notification',
      messages: [
        'Your test results are now available. Please check your medical history.',
        'Your medical records have been updated.',
        'New consultation notes available from your recent visit.',
      ],
    },
  ];

  // Generate notifications for the past 30 days
  for (let day = 0; day < 30; day++) {
    const notificationDate = new Date(today);
    notificationDate.setDate(today.getDate() - day);
    
    // Generate 0-2 notifications per day
    const notificationsPerDay = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < notificationsPerDay; i++) {
      const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      const message = template.messages[Math.floor(Math.random() * template.messages.length)];
      const isRead = day > 2 || Math.random() > 0.5; // Older notifications are more likely to be read
      
      notifications.push({
        id: `NOTIF-${String(1000 + notifications.length).padStart(4, '0')}`,
        title: template.title,
        message,
        type: template.type,
        date: notificationDate.toISOString().split('T')[0],
        read: isRead,
      });
    }
  }

  return notifications.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return Calendar;
    case 'prescription':
      return CheckCircle2;
    case 'reminder':
      return AlertCircle;
    default:
      return Info;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'appointment':
      return 'bg-blue-100 text-blue-600';
    case 'prescription':
      return 'bg-green-100 text-green-600';
    case 'reminder':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications());
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Filter by type
    if (filter !== 'All') {
      filtered = filtered.filter((notif) => notif.type === filter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (notif) =>
          notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notif.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [notifications, filter, searchQuery]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const notifDate = new Date(date);
    notifDate.setHours(0, 0, 0, 0);

    if (notifDate.getTime() === today.getTime()) {
      return 'Today';
    }
    if (notifDate.getTime() === today.getTime() - 86400000) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? (
                  <span>You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</span>
                ) : (
                  <span>All caught up! No unread notifications.</span>
                )}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Mark All as Read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="appointment">Appointments</option>
                <option value="prescription">Prescriptions</option>
                <option value="reminder">Reminders</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read
                        ? 'bg-white border-gray-200'
                        : 'bg-blue-50 border-blue-200'
                    } hover:shadow-md`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div className="flex-1">
                            <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                              {notification.title}
                            </h3>
                            <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-400">{formatDate(notification.date)}</span>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

