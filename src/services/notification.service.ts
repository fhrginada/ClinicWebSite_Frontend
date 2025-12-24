/**
 * MOCK MODE - Frontend only
 */

import { mockNotifications, type MockNotification } from '@/src/mocks/mockData';

export interface Notification {
  notificationId: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

/**
 * Get notifications for the currently authenticated user - MOCK
 */
export async function getMyNotifications(): Promise<Notification[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockNotifications.map(n => ({
    notificationId: n.id,
    userId: 1,
    title: 'Notification',
    message: n.message,
    isRead: n.read,
    createdAt: n.createdAt || new Date().toISOString(),
  }));
}

/**
 * Admin-only: fetch notifications for a specific user - MOCK
 */
export async function getUserNotifications(userId: number): Promise<Notification[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return getMyNotifications();
}

/**
 * Mark a notification as read - MOCK
 */
export async function markAsRead(notificationId: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    console.log('📬 MOCK: Notification marked as read:', notificationId);
  }
}

