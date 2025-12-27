'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/doctor/Sidebar';
import Topbar from '@/components/doctor/Topbar';
import PrescriptionCard from '@/components/doctor/PrescriptionCard';
import TaskList from '@/components/doctor/TaskList';
import TodayAppointmentTable from '@/components/doctor/TodayAppointmentTable';
import { dummyPatients } from '../doctor/patients/data';
import { getMockAuth } from '@/src/auth/mockAuth';

export default function DoctorDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Auth guard - check role from localStorage
  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Doctor') {
      router.replace('/login');
      return;
    }
    setIsAuthorized(true);
  }, [router]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientsStats, setPatientsStats] = useState<{
    totalPatients: number;
    activePatients: number;
  } | null>(null);

  useEffect(() => {
    // Use dummy data instead of API
    const totalPatients = dummyPatients.length;
    const activePatients = dummyPatients.filter(p => p.status === 'Active').length;
    
    setPatientsStats({
      totalPatients,
      activePatients,
    });
    setIsLoading(false);
  }, []);

  // Don't render until authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        {/* Dashboard Stats Cards */}
        {patientsStats && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Patients</h3>
              <p className="text-2xl font-bold text-gray-900">{patientsStats.totalPatients}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Active Patients</h3>
              <p className="text-2xl font-bold text-blue-600">{patientsStats.activePatients}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Prescription Card */}
          <PrescriptionCard />
          
          {/* Tasks Card */}
          <TaskList />
        </div>
        
        {/* Appointments Table */}
        <TodayAppointmentTable />
      </main>
    </div>
  );
}

