import api from './api';

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
 * Get all patients
 */
export async function getAllPatients(): Promise<Patient[]> {
  try {
    const response = await api.get<Patient[]>('/api/Patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
}

/**
 * Get patients with optional query parameters
 */
export async function getPatients(params?: Record<string, any>): Promise<Patient[]> {
  try {
    const response = await api.get<Patient[]>('/api/Patients', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
}

/**
 * Get patient by ID
 */
export async function getPatientById(id: string): Promise<Patient> {
  try {
    const response = await api.get<Patient>(`/api/Patients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient ${id}:`, error);
    throw error;
  }
}

/**
 * Get patients dashboard (aggregated statistics)
 */
export async function getPatientsDashboard(): Promise<PatientsDashboard> {
  try {
    const response = await api.get<PatientsDashboard>('/api/Patients/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients dashboard:', error);
    throw error;
  }
}

/**
 * Get patient dashboard (individual patient statistics)
 */
export async function getPatientDashboard(patientId: string): Promise<PatientDashboard> {
  try {
    const response = await api.get<PatientDashboard>(`/api/Patients/dashboard/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient dashboard for ${patientId}:`, error);
    throw error;
  }
}

