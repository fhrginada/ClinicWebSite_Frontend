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
 */
export async function getAllPatients(): Promise<Patient[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockPatients.map(p => ({
    id: p.id.toString(),
    name: p.name,
    age: p.age,
    gender: p.gender as 'Male' | 'Female' | 'Other',
    lastVisitDate: new Date().toISOString(),
    status: 'Active' as const,
    phone: p.phone || '+1-555-0000',
    email: p.email || 'patient@email.com',
    medicalId: `MED-${p.id}`,
    conditions: [],
    allergies: [],
    assignedDoctor: 'Dr. Emily Carter',
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
  const patient = mockPatients.find(p => p.id.toString() === id);
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
    medicalId: `MED-${patient.id}`,
    conditions: [],
    allergies: [],
    assignedDoctor: 'Dr. Emily Carter',
  };
}

/**
 * Get patients dashboard - MOCK
 */
export async function getPatientsDashboard(): Promise<PatientsDashboard> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const patients = await getAllPatients();
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

