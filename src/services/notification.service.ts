import api from './api';

export interface Notification {
  notificationId: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

/**
 * Get notifications for the currently authenticated user
 */
export async function getMyNotifications(): Promise<Notification[]> {
  const response = await api.get<Notification[]>('/api/notifications/me');
  return response.data;
}

/**
 * Admin-only: fetch notifications for a specific user
 */
export async function getUserNotifications(userId: number): Promise<Notification[]> {
  const response = await api.get<Notification[]>(`/api/notifications/${userId}`);
  return response.data;
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: number): Promise<void> {
  await api.post(`/api/notifications/${notificationId}/read`);
}

