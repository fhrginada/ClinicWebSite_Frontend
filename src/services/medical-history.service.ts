/**
 * MOCK MODE - Frontend only
 */

export interface MedicalHistory {
  id: number;
  patientId: number;
  doctorId?: number | null;
  dateRecorded: string;
  followUpDate?: string | null;
  diagnosis?: string | null;
  treatment?: string | null;
  attachmentUrl?: string | null;
}

export interface MedicalHistoryResponse {
  total: number;
  page: number;
  pageSize: number;
  items: MedicalHistory[];
}

// Import mock data
import { medicalRecords } from '@/src/mocks/dataLoader';

// Convert medical records to medical history format
function getMockMedicalHistory(): MedicalHistory[] {
  return medicalRecords.map((record, index) => ({
    id: index + 1,
    patientId: record.patientId,
    doctorId: record.doctorId,
    dateRecorded: record.visitDate,
    followUpDate: record.followUpDate || null,
    diagnosis: record.diagnosis || null,
    treatment: record.notes || null,
    attachmentUrl: null,
  }));
}

/**
 * Get medical history for a specific patient - MOCK
 */
export async function getMedicalHistory(
  patientId: number,
  page: number = 1,
  pageSize: number = 20,
  doctorId?: number
): Promise<MedicalHistoryResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const mockMedicalHistory = getMockMedicalHistory();
  let filtered = mockMedicalHistory.filter(h => h.patientId === patientId);
  
  // If doctorId is provided, filter by doctor as well
  if (doctorId !== undefined) {
    filtered = filtered.filter(h => h.doctorId === doctorId);
  }
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    total: filtered.length,
    page,
    pageSize,
    items: filtered.slice(start, end),
  };
}

/**
 * Patient-only: get own medical history records - MOCK
 */
export async function getMyMedicalHistory(
  patientId: number,
  page: number = 1,
  pageSize: number = 20
): Promise<MedicalHistoryResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return getAllMedicalHistory(page, pageSize, patientId);
}

/**
 * Get all medical history records - MOCK
 */
export async function getAllMedicalHistory(
  page: number = 1,
  pageSize: number = 20,
  patientId?: number,
  doctorId?: number
): Promise<MedicalHistoryResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const mockMedicalHistory = getMockMedicalHistory();
  let filtered = [...mockMedicalHistory];
  
  if (patientId) {
    filtered = filtered.filter(h => h.patientId === patientId);
  }
  
  if (doctorId !== undefined) {
    filtered = filtered.filter(h => h.doctorId === doctorId);
  }
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    total: filtered.length,
    page,
    pageSize,
    items: filtered.slice(start, end),
  };
}

/**
 * Get a specific medical history record by ID - MOCK
 */
export async function getMedicalHistoryById(id: number): Promise<MedicalHistory> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const mockMedicalHistory = getMockMedicalHistory();
  const record = mockMedicalHistory.find(h => h.id === id);
  if (!record) {
    throw new Error(`Medical history record with ID ${id} not found`);
  }
  return record;
}

/**
 * Create a new medical history record - MOCK
 */
export async function createMedicalHistory(
  payload: Omit<MedicalHistory, 'id'>
): Promise<MedicalHistory> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const mockMedicalHistory = getMockMedicalHistory();
  const newRecord: MedicalHistory = {
    id: Math.max(...mockMedicalHistory.map(h => h.id), 0) + 1,
    ...payload,
  };
  console.log('📋 MOCK: Medical history created:', newRecord);
  return newRecord;
}

/**
 * Update an existing medical history record - MOCK
 */
export async function updateMedicalHistory(
  id: number,
  payload: Partial<MedicalHistory>
): Promise<MedicalHistory> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const mockMedicalHistory = getMockMedicalHistory();
  const record = mockMedicalHistory.find(h => h.id === id);
  if (!record) {
    throw new Error(`Medical history record with ID ${id} not found`);
  }
  const updated = { ...record, ...payload };
  console.log('📋 MOCK: Medical history updated:', id);
  return updated;
}

/**
 * Delete a medical history record - MOCK
 */
export async function deleteMedicalHistory(id: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 150));
  console.log('📋 MOCK: Medical history deleted:', id);
  // Note: In a real implementation, this would delete from the database
}
