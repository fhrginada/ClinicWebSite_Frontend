import { Suspense } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PatientsListClient from './components/PatientsListClient';
import { getAllPatients, Patient } from '@/src/services/patient.service';
import { Patient as LocalPatient } from './types';

async function getPatients(): Promise<LocalPatient[]> {
  try {
    const patients = await getAllPatients();
    // Transform API response to match local Patient type
    return patients.map((p: Patient) => ({
      id: p.id,
      name: p.name,
      age: p.age,
      gender: p.gender,
      lastVisitDate: p.lastVisitDate,
      status: p.status,
      phone: p.phone,
      email: p.email,
      medicalId: p.medicalId,
      conditions: p.conditions || [],
      allergies: p.allergies || [],
      assignedDoctor: p.assignedDoctor,
      avatar: p.avatar,
    }));
  } catch (error) {
    console.error('Error fetching patients:', error);
    // Return empty array on error - UI will show "No patients found"
    return [];
  }
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patients</h1>
            <p className="text-gray-600">
              Manage and view all patients assigned to you
            </p>
          </div>
          <Suspense fallback={<PatientsLoading />}>
            <PatientsListClient initialPatients={patients} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function PatientsLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

