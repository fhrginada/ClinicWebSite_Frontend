/**
 * Data Loader for Mock Data
 * Loads comprehensive mock data from JSON files
 */

import doctorsData from './data/doctors.json';
import patientsData from './data/patients.json';
import nursesData from './data/nurses.json';
import medicalRecordsData from './data/medicalRecords.json';
import prescriptionsData from './data/prescriptions.json';
import testResultsData from './data/testResults.json';

// Export all data
export const doctors = doctorsData;
export const patients = patientsData;
export const nurses = nursesData;
export const medicalRecords = medicalRecordsData;
export const prescriptions = prescriptionsData;
export const testResults = testResultsData;

// Helper functions to get related data
export function getPatientsByDoctor(doctorId: number) {
  return patients.filter(p => p.assignedDoctorId === doctorId);
}

export function getMedicalRecordsByPatient(patientId: number) {
  return medicalRecords.filter(r => r.patientId === patientId);
}

export function getMedicalRecordsByDoctor(doctorId: number) {
  return medicalRecords.filter(r => r.doctorId === doctorId);
}

export function getPrescriptionsByRecord(recordId: string) {
  return prescriptions.filter(p => p.recordId === recordId);
}

export function getPrescriptionsByPatient(patientId: number) {
  return prescriptions.filter(p => p.patientId === patientId);
}

export function getTestResultsByRecord(recordId: string) {
  return testResults.filter(t => t.recordId === recordId);
}

export function getTestResultsByPatient(patientId: number) {
  return testResults.filter(t => t.patientId === patientId);
}

export function getNursesByDoctor(doctorId: number) {
  return nurses.filter(n => n.assignedDoctorId === doctorId);
}

export function getDoctorById(doctorId: number) {
  return doctors.find(d => d.id === doctorId);
}

export function getPatientById(patientId: number) {
  return patients.find(p => p.id === patientId);
}

export function getNurseById(nurseId: number) {
  return nurses.find(n => n.id === nurseId);
}

export function getMedicalRecordById(recordId: string) {
  return medicalRecords.find(r => r.recordId === recordId);
}

export function getPrescriptionById(prescriptionId: string) {
  return prescriptions.find(p => p.prescriptionId === prescriptionId);
}

export function getTestResultById(testResultId: string) {
  return testResults.find(t => t.testResultId === testResultId);
}

/**
 * Unified user type for authentication
 */
export interface User {
  id: number;
  email: string;
  password: string;
  role: 'Doctor' | 'Nurse' | 'Patient';
  name: string;
}

/**
 * Get unified list of all users (doctors, nurses, patients)
 * Used for authentication
 */
export function getAllUsers(): User[] {
  const doctorUsers: User[] = doctors.map(d => ({
    id: d.id,
    email: d.email,
    password: d.password,
    role: 'Doctor' as const,
    name: d.name,
  }));

  const nurseUsers: User[] = nurses.map(n => ({
    id: n.id,
    email: n.email,
    password: n.password,
    role: 'Nurse' as const,
    name: n.name,
  }));

  const patientUsers: User[] = patients.map(p => ({
    id: p.id,
    email: p.email,
    password: p.password,
    role: 'Patient' as const,
    name: p.name,
  }));

  return [...doctorUsers, ...nurseUsers, ...patientUsers];
}

/**
 * Find user by email and password
 * Returns user if credentials match, null otherwise
 */
export function findUserByCredentials(email: string, password: string): User | null {
  const users = getAllUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
}

