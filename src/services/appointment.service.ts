/**
 * MOCK MODE - Frontend only
 * All functions return mock data
 */

import { mockAppointments, type MockAppointment } from '@/src/mocks/mockData';

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
 * Get all appointments - MOCK
 */
export async function getAllAppointments(): Promise<AppointmentResponse[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockAppointments.map(apt => ({
    id: apt.id,
    patientId: apt.patientId || 0,
    patientName: apt.patientName,
    patientEmail: 'patient@email.com',
    patientPhone: '+1-555-0000',
    doctorId: apt.doctorId,
    doctorName: apt.doctorName || 'Dr. Unknown',
    doctorSpecialization: 'General',
    appointmentDate: apt.appointmentDate || apt.date + 'T00:00:00',
    timeSlot: apt.timeSlot || apt.time,
    status: apt.status,
    reasonForVisit: apt.reasonForVisit || '',
    notes: apt.notes || '',
    createdAt: new Date().toISOString(),
    hasConsultation: false,
  }));
}

export async function getMyAppointments(): Promise<AppointmentResponse[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Return appointments for current user (mock: return all)
  return getAllAppointments();
}

export async function getMyDoctorAppointments(): Promise<AppointmentResponse[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Return appointments for current doctor (mock: return all)
  return getAllAppointments();
}

/**
 * Create a new appointment - MOCK
 */
export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<CreateAppointmentResult> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Log the booking data
  console.log('📅 MOCK: Appointment booking request:', payload);
  
  // Generate new appointment ID
  const newId = Math.max(...mockAppointments.map(a => a.id), 0) + 1;
  
  // Add to mock data (in real app, this would be persisted)
  const newAppointment: MockAppointment = {
    id: newId,
    doctorId: payload.doctorId,
    patientId: 1, // Mock patient
    patientName: 'Current User',
    date: payload.appointmentDate.split('T')[0],
    time: payload.timeSlot,
    timeSlot: payload.timeSlot,
    appointmentDate: payload.appointmentDate,
    status: 'Upcoming',
    reasonForVisit: payload.reasonForVisit,
  };
  
  mockAppointments.push(newAppointment);
  
  console.log('✅ MOCK: Appointment created successfully:', newAppointment);
  
  return {
    AppointmentId: newId,
  };
}

/**
 * Update appointment status - MOCK
 */
export async function updateAppointmentStatus(
  payload: UpdateAppointmentStatusPayload
): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const appointment = mockAppointments.find(a => a.id === payload.appointmentId);
  if (!appointment) {
    return false;
  }
  
  appointment.status = payload.status;
  console.log('📝 MOCK: Appointment status updated:', payload);
  return true;
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
 * Get consultation by appointment ID - MOCK
 */
export async function getConsultationByAppointmentId(
  appointmentId: number
): Promise<Consultation> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Return mock consultation
  return {
    id: 1,
    appointmentId,
    notes: 'Mock consultation notes',
    diagnosis: 'Mock diagnosis',
    treatment: 'Mock treatment plan',
    prescription: 'Mock prescription',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Create a new consultation - MOCK
 */
export async function createConsultation(
  payload: CreateConsultationPayload
): Promise<Consultation> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log('📝 MOCK: Consultation created:', payload);
  
  return {
    id: Math.floor(Math.random() * 1000),
    appointmentId: payload.appointmentId,
    notes: payload.notes,
    diagnosis: payload.diagnosis,
    treatment: payload.treatment,
    prescription: payload.prescription,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update an existing consultation - MOCK
 */
export async function updateConsultation(
  id: number,
  payload: Partial<CreateConsultationPayload>
): Promise<Consultation> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  console.log('📝 MOCK: Consultation updated:', { id, payload });
  
  return {
    id,
    appointmentId: 1,
    notes: payload.notes || 'Updated notes',
    diagnosis: payload.diagnosis,
    treatment: payload.treatment,
    prescription: payload.prescription,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

