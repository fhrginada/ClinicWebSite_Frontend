
'use client';

import { useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Bell, Calendar, CheckCircle2, AlertCircle, Info, Search, Filter } from 'lucide-react';
import {
  getMyNotifications,
  markAsRead as markNotificationAsRead,
  type Notification as ApiNotification,
} from '@/src/services/notification.service';

type NotificationType = 'appointment' | 'prescription' | 'reminder' | 'general';

interface NotificationRow {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  read: boolean;
}

const inferType = (title: string): NotificationType => {
  const t = title.toLowerCase();
  if (t.includes('appointment')) return 'appointment';
  if (t.includes('prescription')) return 'prescription';
  if (t.includes('reminder') || t.includes('medication')) return 'reminder';
  return 'general';
};

const toRow = (n: ApiNotification): NotificationRow => ({
  id: n.notificationId,
  title: n.title,
  message: n.message,
  type: inferType(n.title),
  date: n.createdAt,
  read: n.isRead,
});

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
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await getMyNotifications();
        if (cancelled) return;
        setNotifications(data.map(toRow));
      } catch (e: any) {
        if (cancelled) return;
        setLoadError(e?.response?.data?.message ?? 'Failed to load notifications.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    if (filter !== 'All') {
      filtered = filtered.filter((notif) => notif.type === filter);
    }

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

  const markAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
    } catch {
      // no-op
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    await Promise.all(unread.map((n) => markNotificationAsRead(n.id).catch(() => undefined)));
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
                  <span>
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </span>
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
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
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
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading notifications...</p>
              </div>
            ) : loadError ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{loadError}</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
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
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div className="flex-1">
                            <h3
                              className={`font-semibold ${
                                notification.read ? 'text-gray-700' : 'text-gray-900'
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${
                                notification.read ? 'text-gray-500' : 'text-gray-700'
                              }`}
                            >
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

