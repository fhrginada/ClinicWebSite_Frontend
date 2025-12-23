import api from './api';

export interface AppointmentResponse {
  id: number;
  patientId: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: number;
  doctorName: string;
  doctorSpecialization: string;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  reasonForVisit: string;
  notes: string;
  createdAt: string;
  hasConsultation: boolean;
}

export interface UpdateAppointmentStatusPayload {
  appointmentId: number;
  status: string;
  reason?: string;
}

export interface CreateAppointmentPayload {
  doctorId: number;
  appointmentDate: string;
  timeSlot: string;
  reasonForVisit?: string;
}

export interface CreateAppointmentResult {
  AppointmentId: number;
}

/**
 * Get all appointments
 */
export async function getAllAppointments(): Promise<AppointmentResponse[]> {
  const response = await api.get<AppointmentResponse[]>('/api/appointments');
  return response.data;
}

export async function getMyAppointments(): Promise<AppointmentResponse[]> {
  const response = await api.get<AppointmentResponse[]>('/api/appointments/me');
  return response.data;
}

export async function getMyDoctorAppointments(): Promise<AppointmentResponse[]> {
  const response = await api.get<AppointmentResponse[]>('/api/appointments/doctor/me');
  return response.data;
}

/**
 * Create a new appointment
 */
export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<CreateAppointmentResult> {
  const response = await api.post<CreateAppointmentResult>('/api/appointments', payload);
  return response.data;
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(
  payload: UpdateAppointmentStatusPayload
): Promise<boolean> {
  try {
    await api.put('/api/appointments/status', payload);
    return true;
  } catch (err: any) {
    if (err?.response?.status === 404) return false;
    throw err;
  }
}

// ==========================================
// Consultation Endpoints
// ==========================================

export interface Consultation {
  id: number;
  appointmentId: number;
  notes: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateConsultationPayload {
  appointmentId: number;
  notes: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
}

/**
 * Get consultation by appointment ID
 */
export async function getConsultationByAppointmentId(
  appointmentId: number
): Promise<Consultation> {
  const response = await api.get<Consultation>(`/api/consultations/${appointmentId}`);
  return response.data;
}

/**
 * Create a new consultation
 */
export async function createConsultation(
  payload: CreateConsultationPayload
): Promise<Consultation> {
  const response = await api.post<Consultation>('/api/consultations', payload);
  return response.data;
}

/**
 * Update an existing consultation
 */
export async function updateConsultation(
  id: number,
  payload: Partial<CreateConsultationPayload>
): Promise<Consultation> {
  const response = await api.put<Consultation>(`/api/consultations/${id}`, payload);
  return response.data;
}

