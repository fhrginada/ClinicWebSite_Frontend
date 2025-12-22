import api from './api';

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId?: number;
  doctorName?: string;
  medications: Medication[];
  date?: string;
  notes?: string;
}

export interface CreatePrescriptionPayload {
  patientId: string;
  patientName: string;
  medications: Medication[];
  notes?: string;
}

export interface UpdatePrescriptionPayload {
  patientId?: string;
  patientName?: string;
  medications?: Medication[];
  notes?: string;
}

/**
 * Get all prescriptions
 */
export async function getAllPrescriptions(): Promise<Prescription[]> {
  try {
    const response = await api.get<Prescription[]>('/api/Prescriptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
}

/**
 * Get prescription by ID
 */
export async function getPrescriptionById(id: string): Promise<Prescription> {
  try {
    const response = await api.get<Prescription>(`/api/Prescriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching prescription ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new prescription
 */
export async function createPrescription(
  payload: CreatePrescriptionPayload
): Promise<Prescription> {
  try {
    const response = await api.post<Prescription>('/api/Prescriptions', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating prescription:', error);
    throw error;
  }
}

/**
 * Update an existing prescription
 */
export async function updatePrescription(
  id: string,
  payload: UpdatePrescriptionPayload
): Promise<Prescription> {
  try {
    const response = await api.put<Prescription>(`/api/Prescriptions/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating prescription ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a prescription
 */
export async function deletePrescription(id: string): Promise<void> {
  try {
    await api.delete(`/api/Prescriptions/${id}`);
  } catch (error) {
    console.error(`Error deleting prescription ${id}:`, error);
    throw error;
  }
}

/**
 * Download prescription PDF
 */
export async function downloadPrescriptionPdf(id: string): Promise<Blob> {
  try {
    const response = await api.get(`/api/Prescriptions/${id}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error(`Error downloading prescription PDF ${id}:`, error);
    throw error;
  }
}

