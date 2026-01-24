'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PatientsListClient from '../../patients/components/PatientsListClient';
import { getAllPatients, Patient } from '@/src/services/patient.service';
import { Patient as LocalPatient } from '../../patients/types';
import { getMockAuth } from '@/src/auth/mockAuth';

export default function PatientsPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params?.doctorId ? parseInt(params.doctorId as string, 10) : null;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [patients, setPatients] = useState<LocalPatient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Auth guard - check role and user ID
  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Doctor') {
      router.replace('/login');
      return;
    }
    
    // Verify the doctor ID matches the logged-in user
    if (doctorId && auth.userId !== doctorId) {
      router.replace(`/doctor/${auth.userId}/patients`);
      return;
    }
    
    if (!doctorId && auth.userId) {
      router.replace(`/doctor/${auth.userId}/patients`);
      return;
    }
    
    setIsAuthorized(true);
  }, [router, doctorId]);

  // Fetch patients filtered by doctor ID
  useEffect(() => {
    if (!isAuthorized || !doctorId) return;

    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        const allPatients = await getAllPatients(doctorId);
        // Transform API response to match local Patient type
        const transformedPatients: LocalPatient[] = allPatients.map((p: Patient) => ({
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
        setPatients(transformedPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setPatients([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [isAuthorized, doctorId]);

  if (!isAuthorized || !doctorId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar doctorId={doctorId} />
      <main className="ml-72 p-6">
        <Topbar />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patients</h1>
            <p className="text-gray-600">
              Manage and view all patients assigned to you
            </p>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <PatientsListClient initialPatients={patients} />
          )}
        </div>
      </main>
    </div>
  );
}

