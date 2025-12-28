// Mock medical history service - frontend only
export interface MedicalHistory {
  id: number;
  visitDate: string;
  diagnosis: string;
  notes: string;
  visitType: 'Checkup' | 'Follow-up' | 'Emergency';
}

export async function getMyMedicalHistory(): Promise<MedicalHistory[]> {
  // Mock data - frontend only
  return [
    {
      id: 1,
      visitDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      diagnosis: 'Common cold',
      notes: 'Patient presented with symptoms of common cold. Prescribed rest and fluids.',
      visitType: 'Checkup',
    },
    {
      id: 2,
      visitDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      diagnosis: 'Annual physical',
      notes: 'Routine annual checkup. All vitals normal.',
      visitType: 'Checkup',
    },
  ];
}

