import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import PatientProfileClient from './components/PatientProfileClient';

// Mock patient data - in a real app, this would come from an API or database
async function getPatientData() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    id: '1',
    name: 'Alex Smith',
    email: 'alex.smith@email.com',
    phone: '+1 234 567 8900',
    dateOfBirth: '1990-03-15',
    gender: 'Male',
    address: '123 Main Street, New York, NY 10001',
    bloodType: 'O+',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 234 567 8901',
    },
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'BCBS-123456789',
  };
}

export default async function PatientProfilePage() {
  const patientData = await getPatientData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <PatientProfileClient patient={patientData} />
      </main>
    </div>
  );
}

