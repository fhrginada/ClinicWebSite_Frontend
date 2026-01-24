'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import DoctorProfileClient from './components/DoctorProfileClient';
import { getDoctorById } from '@/src/mocks/dataLoader';
import { getMockAuth } from '@/src/auth/mockAuth';

type DoctorData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  bio: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  yearsOfExperience: number;
  education: Array<{ degree: string; institution: string; year: string }>;
  languages: string[];
  profilePicture: string | null;
};

function getDoctorData(doctorId: number): DoctorData | null {
  try {
    const doctor = getDoctorById(doctorId);
    if (!doctor) {
      return null;
    }
    
    // Transform data from JSON to match component expectations
    return {
      id: doctor.id.toString(),
      name: doctor.name || 'Unknown Doctor',
      email: doctor.email || '',
      phone: doctor.phone || '',
      specialization: doctor.specialization || '',
      licenseNumber: doctor.licenseNumber || '',
      bio: doctor.bio || '',
      address: doctor.address || '',
      dateOfBirth: doctor.dateOfBirth || '',
      gender: doctor.gender || '',
      yearsOfExperience: doctor.yearsOfExperience || 0,
      education: doctor.education || [],
      languages: doctor.languages || [],
      profilePicture: null,
    };
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
}

export default function DoctorProfilePage() {
  const router = useRouter();
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Doctor') {
      router.replace('/login');
      return;
    }

    if (!auth.userId) {
      setError('Unable to determine doctor ID');
      setIsLoading(false);
      return;
    }

    setDoctorId(auth.userId);
    const data = getDoctorData(auth.userId);
    if (!data) {
      setError('Doctor profile not found');
      setIsLoading(false);
      return;
    }

    setDoctorData(data);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar doctorId={doctorId || undefined} />
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

  if (error || !doctorData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar doctorId={doctorId || undefined} />
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
      <Sidebar doctorId={doctorId || undefined} />
      <main className="ml-72 p-6">
        <Topbar />
        <DoctorProfileClient doctor={doctorData} />
      </main>
    </div>
  );
}

