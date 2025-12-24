'use client';

import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/nurse/Sidebar';
import Topbar from '@/components/nurse/Topbar';
import { Bell, Calendar, CheckCircle2, XCircle, AlertCircle, Info, Search } from 'lucide-react';
import {
  getMyNotifications,
  markAsRead,
  Notification as ApiNotification,
} from '@/src/services/notification.service';

type NotificationType = 'appointment' | 'reminder' | 'alert' | 'info';

type Notification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: string;
  type: NotificationType;
};

function inferNotificationType(title: string, message: string): NotificationType {
  const text = `${title} ${message}`.toLowerCase();
  if (text.includes('appointment') || text.includes('schedule') || text.includes('booking')) return 'appointment';
  if (text.includes('reminder')) return 'reminder';
  if (text.includes('cancel') || text.includes('urgent') || text.includes('failed')) return 'alert';
  return 'info';
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return Calendar;
    case 'reminder':
      return AlertCircle;
    case 'alert':
      return XCircle;
    default:
      return Info;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'appointment':
      return 'bg-blue-100 text-blue-600';
    case 'reminder':
      return 'bg-yellow-100 text-yellow-600';
    case 'alert':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMyNotifications();
        setNotifications(
          data.map((n: ApiNotification) => ({
            id: n.notificationId,
            title: n.title,
            message: n.message,
            read: n.isRead,
            date: n.createdAt,
            type: inferNotificationType(n.title, n.message),
          }))
        );
      } catch (err) {
        console.error('Error loading notifications:', err);
        setError('Failed to load notifications. Please try again later.');
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
      // Update local state optimistically
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Revert optimistic update on error
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif))
      );
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.read);
    try {
      // Mark all unread notifications as read
      await Promise.all(unreadNotifications.map((n) => markAsRead(n.id)));
      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      // On error, still update UI optimistically for better UX
      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    }
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
                <option value="reminder">Reminders</option>
                <option value="alert">Alerts</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading notifications...</p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-red-600 mb-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Notifications List */}
          {!isLoading && !error && (
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
                                onClick={() => handleMarkAsRead(notification.id)}
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
          )}
        </div>
      </main>
    </div>
  );
}

