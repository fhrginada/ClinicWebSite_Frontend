import { notFound } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PatientProfileClient from './components/PatientProfileClient';
import { Patient } from '../types';
import { dummyPatients } from '../data';

function getPatient(patientId: string): Patient | null {
  // Use dummy data instead of API
  return dummyPatients.find(p => p.id === patientId) || null;
}

export default async function PatientProfilePage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const patient = await getPatient(patientId);

  if (!patient) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <PatientProfileClient patient={patient} />
      </main>
    </div>
  );
}

