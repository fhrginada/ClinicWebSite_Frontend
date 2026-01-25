/**
 * Dynamic Notification Manager using localStorage
 */

export interface DynamicNotification {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'clinic.notifications';

// Initialize with default notifications
const defaultNotifications: DynamicNotification[] = [
  {
    id: 1,
    message: "New appointment booked",
    read: false,
    createdAt: "2025-01-07T10:00:00",
  },
  {
    id: 2,
    message: "Appointment confirmed",
    read: true,
    createdAt: "2025-01-06T14:30:00",
  },
  {
    id: 3,
    message: "Your appointment is tomorrow",
    read: false,
    createdAt: "2025-01-09T09:00:00",
  },
];

/**
 * Get all notifications from localStorage
 */
export function getNotifications(): DynamicNotification[] {
  if (typeof window === 'undefined') return defaultNotifications;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with defaults
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotifications));
    return defaultNotifications;
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing notifications:', e);
    return defaultNotifications;
  }
}

/**
 * Add a new notification
 */
export function addNotification(message: string): void {
  if (typeof window === 'undefined') return;
  
  const notifications = getNotifications();
  const newId = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
  
  const newNotification: DynamicNotification = {
    id: newId,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  
  notifications.unshift(newNotification); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  
  // Trigger storage event for other tabs/components
  window.dispatchEvent(new Event('notificationsChanged'));
  
  console.log('✅ Notification added:', message);
}

/**
 * Mark notification as read
 */
export function markNotificationAsRead(id: number): void {
  if (typeof window === 'undefined') return;
  
  const notifications = getNotifications();
  const notification = notifications.find(n => n.id === id);
  
  if (notification) {
    notification.read = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new Event('notificationsChanged'));
  }
}

/**
 * Mark all notifications as read
 */
export function markAllNotificationsAsRead(): void {
  if (typeof window === 'undefined') return;
  
  const notifications = getNotifications();
  notifications.forEach(n => n.read = true);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  window.dispatchEvent(new Event('notificationsChanged'));
}

/**
 * Get unread count
 */
export function getUnreadCount(): number {
  return getNotifications().filter(n => !n.read).length;
}

/**
 * Clear all notifications (for testing)
 */
export function clearAllNotifications(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
