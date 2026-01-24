'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import PatientProfileClient from './components/PatientProfileClient';
import { getPatientById } from '@/src/mocks/dataLoader';
import { getMockAuth } from '@/src/auth/mockAuth';

type PatientData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  bloodType: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  insuranceProvider: string;
  insurancePolicyNumber: string;
};

function getPatientData(patientId: number): PatientData | null {
  try {
    const patient = getPatientById(patientId);
    if (!patient) {
      return null;
    }
    
    // Transform data from JSON to match component expectations
    return {
      id: patient.id.toString(),
      name: patient.name || 'Unknown Patient',
      email: patient.email || '',
      phone: patient.phone || '',
      dateOfBirth: patient.dateOfBirth || '',
      gender: patient.gender || '',
      address: patient.address || '',
      bloodType: patient.bloodType || '',
      emergencyContact: patient.emergencyContact || {
        name: '',
        relationship: '',
        phone: '',
      },
      allergies: patient.allergies || [],
      chronicConditions: patient.conditions || [],
      insuranceProvider: patient.insuranceProvider || '',
      insurancePolicyNumber: patient.insurancePolicyNumber || '',
    };
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
}

export default function PatientProfilePage() {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Patient') {
      router.replace('/login');
      return;
    }

    if (!auth.userId) {
      setError('Unable to determine patient ID');
      setIsLoading(false);
      return;
    }

    setPatientId(auth.userId);
    const data = getPatientData(auth.userId);
    if (!data) {
      setError('Patient profile not found');
      setIsLoading(false);
      return;
    }

    setPatientData(data);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar patientId={patientId || undefined} />
        <main className="ml-72 p-6">
          <Topbar />
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar patientId={patientId || undefined} />
        <main className="ml-72 p-6">
          <Topbar />
          <div className="text-center py-12">
            <p className="text-red-600 mb-2">{error || 'Failed to load profile'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientId={patientId || undefined} />
      <main className="ml-72 p-6">
        <Topbar />
        <PatientProfileClient patient={patientData} />
      </main>
    </div>
  );
}

