// Mock prescription service - frontend only
export interface CreatePrescriptionPayload {
  patientId: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration?: string;
  }>;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration?: string;
  }>;
  notes?: string;
}

export async function createPrescription(payload: CreatePrescriptionPayload): Promise<Prescription> {
  // Mock implementation - frontend only
  return {
    id: Date.now().toString(),
    patientId: payload.patientId,
    patientName: 'Patient Name',
    date: new Date().toISOString(),
    medications: payload.medications,
    notes: payload.notes,
  };
}

