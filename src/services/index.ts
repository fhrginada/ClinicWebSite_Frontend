/**
 * Main services export file
 * This file exports all API services for easy access throughout the application
 * 
 * MOCK MODE: API exports disabled
 */

// export { default as api } from './api'; // Disabled in mock mode
export * from './appointment.service';
export * from './doctor.service';
export * from './medical-history.service';
export * from './notification.service';
export * from './nurse.service';
export * from './patient.service';
export * from './prescription.service';

// Quick reference for API endpoints
export const API_ENDPOINTS = {
  // Patients
  PATIENTS: '/api/Patients',
  PATIENT_DASHBOARD: '/api/Patients/dashboard',
  PATIENT_BY_ID: (id: string) => `/api/Patients/${id}`,
  
  // Doctors
  DOCTORS: '/api/doctors',
  DOCTOR_BY_ID: (id: number) => `/api/doctors/${id}`,
  DOCTOR_AVAILABILITY: (id: number) => `/api/doctors/${id}/availability`,
  
  // Medical History
  MEDICAL_HISTORY: '/api/medical-history',
  MEDICAL_HISTORY_BY_PATIENT: (patientId: number) => `/api/medical-history/patient/${patientId}`,
  
  // Appointments
  APPOINTMENTS: '/api/appointments',
  APPOINTMENT_STATUS: '/api/appointments/status',
  
  // Consultations
  CONSULTATIONS: '/api/consultations',
  CONSULTATION_BY_APPOINTMENT: (appointmentId: number) => `/api/consultations/${appointmentId}`,
  CONSULTATION_UPDATE: (id: number) => `/api/consultations/${id}`,
  
  // Prescriptions
  PRESCRIPTIONS: '/api/Prescriptions',
  PRESCRIPTION_BY_ID: (id: string) => `/api/Prescriptions/${id}`,
  
  // Notifications
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_READ: (id: string) => `/api/notifications/${id}/read`,
} as const;
