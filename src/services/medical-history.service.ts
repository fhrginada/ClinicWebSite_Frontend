import api from './api';

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

/**
 * Get medical history for a specific patient
 * @param patientId - Patient ID
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 20)
 */
export async function getMedicalHistory(
  patientId: number,
  page: number = 1,
  pageSize: number = 20
): Promise<MedicalHistoryResponse> {
  const response = await api.get<MedicalHistoryResponse>(
    `/api/medical-history/patient/${patientId}`,
    {
      params: { page, pageSize },
    }
  );
  return response.data;
}

/**
 * Patient-only: get own medical history records
 */
export async function getMyMedicalHistory(
  page: number = 1,
  pageSize: number = 20
): Promise<MedicalHistoryResponse> {
  const response = await api.get<MedicalHistoryResponse>('/api/medical-history/me', {
    params: { page, pageSize },
  });
  return response.data;
}

/**
 * Get all medical history records (with optional patient filter)
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 20)
 * @param patientId - Optional patient ID filter
 */
export async function getAllMedicalHistory(
  page: number = 1,
  pageSize: number = 20,
  patientId?: number
): Promise<MedicalHistoryResponse> {
  const params: Record<string, any> = { page, pageSize };
  if (patientId) {
    params.patientId = patientId;
  }

  const response = await api.get<MedicalHistoryResponse>('/api/medical-history', {
    params,
  });
  return response.data;
}

/**
 * Get a specific medical history record by ID
 * @param id - Medical history record ID
 */
export async function getMedicalHistoryById(id: number): Promise<MedicalHistory> {
  const response = await api.get<MedicalHistory>(`/api/medical-history/${id}`);
  return response.data;
}

/**
 * Create a new medical history record
 * @param payload - Medical history data
 */
export async function createMedicalHistory(
  payload: Omit<MedicalHistory, 'id'>
): Promise<MedicalHistory> {
  const response = await api.post<MedicalHistory>('/api/medical-history', payload);
  return response.data;
}

/**
 * Update an existing medical history record
 * @param id - Medical history record ID
 * @param payload - Updated medical history data
 */
export async function updateMedicalHistory(
  id: number,
  payload: Partial<MedicalHistory>
): Promise<MedicalHistory> {
  const response = await api.put<MedicalHistory>(`/api/medical-history/${id}`, payload);
  return response.data;
}

/**
 * Delete a medical history record
 * @param id - Medical history record ID
 */
export async function deleteMedicalHistory(id: number): Promise<void> {
  await api.delete(`/api/medical-history/${id}`);
}
