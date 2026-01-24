/**
 * MOCK MODE - Frontend only
 */

import { mockPatients, type MockPatient } from '@/src/mocks/mockData';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastVisitDate: string;
  status: 'Active' | 'Archived';
  phone: string;
  email: string;
  medicalId: string;
  conditions: string[];
  allergies: string[];
  assignedDoctor: string;
  avatar?: string;
}

export interface PatientsDashboard {
  totalPatients: number;
  activePatients: number;
  newPatientsThisMonth: number;
  upcomingAppointments: number;
  recentVisits: Patient[];
}

export interface PatientDashboard {
  patient: Patient;
  upcomingAppointments: number;
  recentVisits: number;
  activePrescriptions: number;
  lastVisitDate: string;
}

/**
 * Get all patients - MOCK
 * @param doctorId - Optional: filter patients by assigned doctor ID
 */
export async function getAllPatients(doctorId?: number): Promise<Patient[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const { patients } = await import('@/src/mocks/dataLoader');
  
  let filteredPatients = patients;
  if (doctorId) {
    filteredPatients = patients.filter(p => p.assignedDoctorId === doctorId);
  }
  
  return filteredPatients.map(p => ({
    id: p.id.toString(),
    name: p.name,
    age: p.age,
    gender: p.gender as 'Male' | 'Female' | 'Other',
    lastVisitDate: new Date().toISOString(),
    status: 'Active' as const,
    phone: p.phone || '+1-555-0000',
    email: p.email || 'patient@email.com',
    medicalId: p.medicalId || `MED-${p.id}`,
    conditions: p.conditions || [],
    allergies: p.allergies || [],
    assignedDoctor: p.assignedDoctor || 'Unknown',
  }));
}

/**
 * Get patients with optional query parameters - MOCK
 */
export async function getPatients(params?: Record<string, any>): Promise<Patient[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return getAllPatients();
}

/**
 * Get patient by ID - MOCK
 */
export async function getPatientById(id: string): Promise<Patient> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const { patients } = await import('@/src/mocks/dataLoader');
  const patient = patients.find(p => p.id.toString() === id);
  if (!patient) {
    throw new Error(`Patient with ID ${id} not found`);
  }
  return {
    id: patient.id.toString(),
    name: patient.name,
    age: patient.age,
    gender: patient.gender as 'Male' | 'Female' | 'Other',
    lastVisitDate: new Date().toISOString(),
    status: 'Active' as const,
    phone: patient.phone || '+1-555-0000',
    email: patient.email || 'patient@email.com',
    medicalId: patient.medicalId || `MED-${patient.id}`,
    conditions: patient.conditions || [],
    allergies: patient.allergies || [],
    assignedDoctor: patient.assignedDoctor || 'Unknown',
  };
}

/**
 * Get patients dashboard - MOCK
 * @param doctorId - Doctor ID to filter patients
 */
export async function getPatientsDashboard(doctorId?: number): Promise<PatientsDashboard> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const patients = await getAllPatients(doctorId);
  return {
    totalPatients: patients.length,
    activePatients: patients.length,
    newPatientsThisMonth: 2,
    upcomingAppointments: 3,
    recentVisits: patients.slice(0, 5),
  };
}

/**
 * Get patient dashboard - MOCK
 */
export async function getPatientDashboard(patientId: string): Promise<PatientDashboard> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const patient = await getPatientById(patientId);
  return {
    patient,
    upcomingAppointments: 2,
    recentVisits: 5,
    activePrescriptions: 1,
    lastVisitDate: new Date().toISOString(),
  };
}

