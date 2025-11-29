import { Patient, MedicalRecord } from './types';

// Dummy data for patients
export const dummyPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    lastVisitDate: '2024-01-15',
    status: 'Active',
    phone: '+1 234-567-8900',
    email: 'john.smith@email.com',
    medicalId: 'MED-001',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin', 'Peanuts'],
    assignedDoctor: 'Dr. Ahmed Nabel',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    lastVisitDate: '2024-01-10',
    status: 'Active',
    phone: '+1 234-567-8901',
    email: 'sarah.j@email.com',
    medicalId: 'MED-002',
    conditions: ['Asthma'],
    allergies: ['Dust', 'Pollen'],
    assignedDoctor: 'Dr. Ahmed Nabel',
  },
  {
    id: '3',
    name: 'Michael Chen',
    age: 58,
    gender: 'Male',
    lastVisitDate: '2023-12-20',
    status: 'Active',
    phone: '+1 234-567-8902',
    email: 'm.chen@email.com',
    medicalId: 'MED-003',
    conditions: ['Arthritis', 'High Cholesterol'],
    allergies: [],
    assignedDoctor: 'Dr. Ahmed Nabel',
  },
  {
    id: '4',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    lastVisitDate: '2023-11-15',
    status: 'Archived',
    phone: '+1 234-567-8903',
    email: 'emily.d@email.com',
    medicalId: 'MED-004',
    conditions: [],
    allergies: ['Latex'],
    assignedDoctor: 'Dr. Ahmed Nabel',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    age: 67,
    gender: 'Male',
    lastVisitDate: '2024-01-20',
    status: 'Active',
    phone: '+1 234-567-8904',
    email: 'r.wilson@email.com',
    medicalId: 'MED-005',
    conditions: ['Heart Disease', 'Hypertension'],
    allergies: ['Aspirin'],
    assignedDoctor: 'Dr. Ahmed Nabel',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    age: 41,
    gender: 'Female',
    lastVisitDate: '2024-01-18',
    status: 'Active',
    phone: '+1 234-567-8905',
    email: 'lisa.a@email.com',
    medicalId: 'MED-006',
    conditions: ['Migraine'],
    allergies: ['Sulfa drugs'],
    assignedDoctor: 'Dr. Ahmed Nabel',
  },
];

// Dummy data for medical records
export const dummyRecords: Record<string, MedicalRecord[]> = {
  '1': [
    {
      id: 'rec-1-1',
      visitDate: '2024-01-15',
      diagnosis: 'Hypertension Management',
      notes: 'Patient reports stable blood pressure. Continue current medication regimen.',
      prescription: {
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
          { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
        ],
      },
      doctorName: 'Dr. Ahmed Nabel',
      visitType: 'Follow-up',
    },
    {
      id: 'rec-1-2',
      visitDate: '2023-12-01',
      diagnosis: 'Annual Checkup',
      notes: 'Routine annual physical examination. All vitals within normal range.',
      prescription: {
        medications: [],
      },
      doctorName: 'Dr. Ahmed Nabel',
      visitType: 'Checkup',
    },
  ],
  '2': [
    {
      id: 'rec-2-1',
      visitDate: '2024-01-10',
      diagnosis: 'Asthma Exacerbation',
      notes: 'Patient experiencing increased wheezing. Adjusted inhaler dosage.',
      prescription: {
        medications: [
          { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' },
          { name: 'Fluticasone', dosage: '220mcg', frequency: 'Twice daily' },
        ],
      },
      doctorName: 'Dr. Ahmed Nabel',
      visitType: 'Follow-up',
    },
  ],
  '3': [
    {
      id: 'rec-3-1',
      visitDate: '2023-12-20',
      diagnosis: 'Arthritis Flare-up',
      notes: 'Patient reports increased joint pain in knees. Prescribed anti-inflammatory medication.',
      prescription: {
        medications: [
          { name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily' },
        ],
      },
      doctorName: 'Dr. Ahmed Nabel',
      visitType: 'Emergency',
    },
  ],
  '5': [
    {
      id: 'rec-5-1',
      visitDate: '2024-01-20',
      diagnosis: 'Cardiac Follow-up',
      notes: 'ECG shows normal rhythm. Continue cardiac medications.',
      prescription: {
        medications: [
          { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
          { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
        ],
      },
      doctorName: 'Dr. Ahmed Nabel',
      visitType: 'Follow-up',
    },
  ],
  '6': [
    {
      id: 'rec-6-1',
      visitDate: '2024-01-18',
      diagnosis: 'Migraine Management',
      notes: 'Patient reports frequent migraines. Started on preventive medication.',
      prescription: {
        medications: [
          { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed' },
          { name: 'Propranolol', dosage: '40mg', frequency: 'Twice daily' },
        ],
      },
      doctorName: 'Dr. Ahmed Nabel',
      visitType: 'Checkup',
    },
  ],
};

