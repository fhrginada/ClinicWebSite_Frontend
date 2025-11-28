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

export interface MedicalRecord {
  id: string;
  visitDate: string;
  diagnosis: string;
  notes: string;
  prescription: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
    }>;
  };
  doctorName: string;
  visitType: 'Checkup' | 'Follow-up' | 'Emergency';
}

export type SortOption = 'name' | 'lastVisit' | 'status';

