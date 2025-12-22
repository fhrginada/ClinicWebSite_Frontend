import { notFound } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PatientProfileClient from './components/PatientProfileClient';
import { getPatientById, Patient } from '@/src/services/patient.service';
import { Patient as LocalPatient } from '../types';

async function getPatient(patientId: string): Promise<LocalPatient | null> {
  try {
    const patient = await getPatientById(patientId);
    // Transform API response to match local Patient type
    return {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      lastVisitDate: patient.lastVisitDate,
      status: patient.status,
      phone: patient.phone,
      email: patient.email,
      medicalId: patient.medicalId,
      conditions: patient.conditions || [],
      allergies: patient.allergies || [],
      assignedDoctor: patient.assignedDoctor,
      avatar: patient.avatar,
    };
  } catch (error) {
    console.error(`Error fetching patient ${patientId}:`, error);
    return null;
  }
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

