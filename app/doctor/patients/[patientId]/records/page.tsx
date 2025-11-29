import { notFound } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import RecordsListClient from './components/RecordsListClient';
import { dummyPatients, dummyRecords } from '../../data';

async function getPatient(patientId: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dummyPatients.find((p) => p.id === patientId);
}

async function getRecords(patientId: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dummyRecords[patientId] || [];
}

export default async function RecordsPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const [patient, records] = await Promise.all([
    getPatient(patientId),
    getRecords(patientId),
  ]);

  if (!patient) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-72 p-6">
        <Topbar />
        <RecordsListClient patient={patient} initialRecords={records} />
      </main>
    </div>
  );
}

