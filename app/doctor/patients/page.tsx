import { Suspense } from 'react';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PatientsListClient from './components/PatientsListClient';
import { dummyPatients } from './data';

async function getPatients() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dummyPatients;
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

