'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/patient/Sidebar';
import Topbar from '@/components/patient/Topbar';
import { Calendar, MessageSquare, Bell, CheckCircle2 } from 'lucide-react';
import { getMockAuth } from '@/src/auth/mockAuth';
import { getMyMedicalHistory } from '@/src/services/medical-history.service';
import { getPrescriptionsByPatient } from '@/src/mocks/dataLoader';

export default function PatientDashboard() {
  const router = useRouter();
  const params = useParams();
  const patientId = params?.patientId ? parseInt(params.patientId as string, 10) : null;
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Auth guard - check role and user ID
  useEffect(() => {
    const auth = getMockAuth();
    if (!auth.isAuthenticated || auth.role !== 'Patient') {
      router.replace('/login');
      return;
    }
    
    // Verify the patient ID matches the logged-in user
    if (patientId && auth.userId !== patientId) {
      router.replace(`/patient/${auth.userId}/dashboard`);
      return;
    }
    
    if (!patientId && auth.userId) {
      router.replace(`/patient/${auth.userId}/dashboard`);
      return;
    }
    
    setIsAuthorized(true);
  }, [router, patientId]);

  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [activePrescriptions, setActivePrescriptions] = useState(0);
  const [recentVisits, setRecentVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthorized || !patientId) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch patient's medical history
        const medicalHistory = await getMyMedicalHistory(patientId);
        setRecentVisits(medicalHistory.total);

        // Fetch patient's prescriptions
        const prescriptions = getPrescriptionsByPatient(patientId);
        setActivePrescriptions(prescriptions.filter(p => p.status === 'Active').length);

        // TODO: Fetch upcoming appointments when appointment service is updated
        setUpcomingAppointments(0);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthorized, patientId]);

  // Don't render until authorized
  if (!isAuthorized || !patientId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar patientId={patientId} />
      
      <main className="ml-72 p-6">
        <Topbar />
        
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">
              Here's an overview of your health information and upcoming activities.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {isLoading ? '...' : upcomingAppointments}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upcoming Appointments</h3>
            <p className="text-sm text-gray-600">You have {upcomingAppointments} scheduled visits</p>
          </div>

          {/* Active Prescriptions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {isLoading ? '...' : activePrescriptions}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Prescriptions</h3>
            <p className="text-sm text-gray-600">{activePrescriptions} medications in use</p>
          </div>

          {/* Recent Visits Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {isLoading ? '...' : recentVisits}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Visits</h3>
            <p className="text-sm text-gray-600">{recentVisits} medical records available</p>
          </div>
        </div>
      </main>
    </div>
  );
}

