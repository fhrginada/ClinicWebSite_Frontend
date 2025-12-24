import axios, { AxiosError } from 'axios';
import { clearToken, getToken } from '@/src/auth/tokenStore';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);

export default api;
// Export all endpoints for reference
// ==========================================

export const API_ENDPOINTS = {
  // Patients
  PATIENTS: '/api/Patients',
  PATIENT_DASHBOARD_ME: '/api/Patients/dashboard/me',
  PATIENT_BY_ID: (id: string) => `/api/Patients/${id}`,

  // Medical History
  MEDICAL_HISTORY: '/api/medical-history',
  MEDICAL_HISTORY_ME: '/api/medical-history/me',
  MEDICAL_HISTORY_BY_PATIENT: (patientId: number) =>
    `/api/medical-history/patient/${patientId}`,

  // Doctors
  DOCTORS: '/api/doctors',
  DOCTOR_BY_ID: (id: number) => `/api/doctors/${id}`,
  DOCTOR_AVAILABILITY: (id: number) => `/api/doctors/${id}/availability`,

  // Appointments
  APPOINTMENTS: '/api/appointments',
  APPOINTMENTS_ME: '/api/appointments/me',
  APPOINTMENTS_DOCTOR_ME: '/api/appointments/doctor/me',
  APPOINTMENT_STATUS: '/api/appointments/status',

  // Consultations
  CONSULTATIONS: '/api/consultations',
  CONSULTATION_BY_APPOINTMENT: (appointmentId: number) =>
    `/api/consultations/${appointmentId}`,
} as const;

