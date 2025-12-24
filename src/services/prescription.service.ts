/**
 * MOCK MODE - Frontend only
 */

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

// Mock prescriptions data
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sara Ahmed',
    doctorId: 1,
    doctorName: 'Dr. Emily Carter',
    medications: [
      { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: '7 days' },
    ],
    date: new Date().toISOString(),
    notes: 'Take with food',
  },
];

/**
 * Get all prescriptions - MOCK
 */
export async function getAllPrescriptions(): Promise<Prescription[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...mockPrescriptions];
}

/**
 * Get prescription by ID - MOCK
 */
export async function getPrescriptionById(id: string): Promise<Prescription> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const prescription = mockPrescriptions.find(p => p.id === id);
  if (!prescription) {
    throw new Error(`Prescription with ID ${id} not found`);
  }
  return prescription;
}

/**
 * Create a new prescription - MOCK
 */
export async function createPrescription(
  payload: CreatePrescriptionPayload
): Promise<Prescription> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newPrescription: Prescription = {
    id: (mockPrescriptions.length + 1).toString(),
    patientId: payload.patientId,
    patientName: payload.patientName,
    medications: payload.medications,
    notes: payload.notes,
    date: new Date().toISOString(),
  };
  mockPrescriptions.push(newPrescription);
  console.log('💊 MOCK: Prescription created:', newPrescription);
  return newPrescription;
}

/**
 * Update an existing prescription - MOCK
 */
export async function updatePrescription(
  id: string,
  payload: UpdatePrescriptionPayload
): Promise<Prescription> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const prescription = mockPrescriptions.find(p => p.id === id);
  if (!prescription) {
    throw new Error(`Prescription with ID ${id} not found`);
  }
  Object.assign(prescription, payload);
  console.log('💊 MOCK: Prescription updated:', id);
  return prescription;
}

/**
 * Delete a prescription - MOCK
 */
export async function deletePrescription(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const index = mockPrescriptions.findIndex(p => p.id === id);
  if (index !== -1) {
    mockPrescriptions.splice(index, 1);
    console.log('💊 MOCK: Prescription deleted:', id);
  }
}

/**
 * Download prescription PDF - MOCK
 */
export async function downloadPrescriptionPdf(id: string): Promise<Blob> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Return a mock blob
  const text = `Prescription ${id}\nMock PDF content`;
  return new Blob([text], { type: 'application/pdf' });
}

