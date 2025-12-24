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

// Mock medical history data
const mockMedicalHistory: MedicalHistory[] = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    dateRecorded: new Date().toISOString(),
    diagnosis: 'Mock diagnosis',
    treatment: 'Mock treatment',
  },
];

/**
 * Get medical history for a specific patient - MOCK
 */
export async function getMedicalHistory(
  patientId: number,
  page: number = 1,
  pageSize: number = 20
): Promise<MedicalHistoryResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const filtered = mockMedicalHistory.filter(h => h.patientId === patientId);
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
  page: number = 1,
  pageSize: number = 20
): Promise<MedicalHistoryResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return getAllMedicalHistory(page, pageSize, 1);
}

/**
 * Get all medical history records - MOCK
 */
export async function getAllMedicalHistory(
  page: number = 1,
  pageSize: number = 20,
  patientId?: number
): Promise<MedicalHistoryResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  let filtered = [...mockMedicalHistory];
  if (patientId) {
    filtered = filtered.filter(h => h.patientId === patientId);
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
  const newRecord: MedicalHistory = {
    id: Math.max(...mockMedicalHistory.map(h => h.id), 0) + 1,
    ...payload,
  };
  mockMedicalHistory.push(newRecord);
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
  const record = mockMedicalHistory.find(h => h.id === id);
  if (!record) {
    throw new Error(`Medical history record with ID ${id} not found`);
  }
  Object.assign(record, payload);
  console.log('📋 MOCK: Medical history updated:', id);
  return record;
}

/**
 * Delete a medical history record - MOCK
 */
export async function deleteMedicalHistory(id: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const index = mockMedicalHistory.findIndex(h => h.id === id);
  if (index !== -1) {
    mockMedicalHistory.splice(index, 1);
    console.log('📋 MOCK: Medical history deleted:', id);
  }
}
