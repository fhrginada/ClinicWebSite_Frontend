// Mock notification service - frontend only
export interface Notification {
  notificationId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export async function getMyNotifications(): Promise<Notification[]> {
  // Mock data - frontend only
  return [
    {
      notificationId: 1,
      title: 'New Appointment',
      message: 'You have a new appointment scheduled for tomorrow',
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      notificationId: 2,
      title: 'Reminder',
      message: 'Don\'t forget your appointment at 2 PM today',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
}

// Fixed: Parameter is required by callers but unused in mock implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function markAsRead(_notificationId: number): Promise<void> {
  // Mock implementation - frontend only
  return Promise.resolve();
}

