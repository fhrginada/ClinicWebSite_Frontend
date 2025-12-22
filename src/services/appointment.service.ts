import api from './api';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  reason?: string;
  doctorId?: number;
  doctorName?: string;
}

export interface UpdateAppointmentStatusPayload {
  appointmentId: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

/**
 * Get all appointments
 */
export async function getAllAppointments(): Promise<Appointment[]> {
  try {
    const response = await api.get<Appointment[]>('/api/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(
  payload: UpdateAppointmentStatusPayload
): Promise<Appointment> {
  try {
    const response = await api.put<Appointment>(
      '/api/appointments/status',
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
}

