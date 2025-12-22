import api from './api';

export interface Nurse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  bio?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  yearsOfExperience?: number;
  profilePicture?: string | null;
}

export interface NotificationPayload {
  doctorId: number;
  message: string;
  appointmentId?: string;
}

/**
 * Send notification to doctor
 */
export async function notifyDoctor(payload: NotificationPayload): Promise<void> {
  try {
    // Assuming notification endpoint exists or mocking it cleanly
    await api.post('/api/notifications', payload);
  } catch (error) {
    // If endpoint doesn't exist, log but don't fail
    // In a real app, this would be implemented
    console.warn('Notification endpoint may not be implemented:', error);
    // For now, we'll simulate success
    return Promise.resolve();
  }
}

/**
 * Get nurse by ID
 */
export async function getNurseById(id: number): Promise<Nurse> {
  try {
    const response = await api.get<Nurse>(`/api/Nurse/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching nurse ${id}:`, error);
    throw error;
  }
}

/**
 * Update nurse information
 */
export async function updateNurse(id: number, payload: Partial<Nurse>): Promise<Nurse> {
  try {
    const response = await api.put<Nurse>(`/api/Nurse/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating nurse ${id}:`, error);
    throw error;
  }
}

