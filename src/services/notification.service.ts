import api from './api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'general' | 'alert';
  date: string;
  read: boolean;
  userId?: string;
}

/**
 * Get all notifications for a user
 */
export async function getUserNotifications(userId: string): Promise<Notification[]> {
  try {
    const response = await api.get<Notification[]>(`/api/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notifications for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string): Promise<void> {
  try {
    await api.post(`/api/notifications/${notificationId}/read`);
  } catch (error) {
    console.error(`Error marking notification ${notificationId} as read:`, error);
    throw error;
  }
}

